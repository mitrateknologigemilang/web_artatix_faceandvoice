import * as ort from "onnxruntime-web";

type FaceBox = [number, number, number, number, number];

export type FaceLivenessStatus =
	| "loading"
	| "no-face"
	| "out-of-frame"
	| "verifying"
	| "real"
	| "fake"
	| "error";

export interface FaceLivenessResult {
	bbox: FaceBox;
	liveness: {
		isRealRaw: boolean;
		isReal: boolean;
		label: "FAKE" | "REAL" | "VERIFYING...";
		confidence: number;
		stabilityScore: number;
		probabilities: {
			fakePrint: number;
			real: number;
			fakeScreen: number;
		};
	};
}

interface RawLivenessResult {
	isRealRaw: boolean;
	rawLabel: "FAKE" | "REAL";
	confidence: number;
	probabilities: {
		fakePrint: number;
		real: number;
		fakeScreen: number;
	};
}

const RF_CONFIG = {
	inputSize: 640,
	confThreshold: 0.6,
	nmsThreshold: 0.4,
	variance: [0.1, 0.2],
};

const MINIFAS_CONFIG = {
	inputSize: 80,
	realThreshold: 0.75,
};

const REQUIRED_CONSECUTIVE_REAL = 8;

let runtimeConfigured = false;

function configureRuntime() {
	if (runtimeConfigured) return;
	ort.env.logLevel = "fatal";
	ort.env.wasm.wasmPaths = "/ort/";
	ort.env.wasm.numThreads = 1;
	runtimeConfigured = true;
}

export class FaceLivenessDetector {
	private retinaFaceSession: ort.InferenceSession | null = null;
	private miniFASSession: ort.InferenceSession | null = null;
	private anchors: number[][] = [];
	private stabilityCounter = 0;

	async loadModels() {
		configureRuntime();
		this.anchors = this.generateAnchors(RF_CONFIG.inputSize);

		const options: ort.InferenceSession.SessionOptions = {
			executionProviders: ["wasm"],
			graphOptimizationLevel: "all",
		};

		const [retinaFaceSession, miniFASSession] = await Promise.all([
			ort.InferenceSession.create(
				"/models/liveness/Widerface-RetinaFace.onnx",
				options,
			),
			ort.InferenceSession.create(
				"/models/liveness/2.7_80x80_MiniFASNetV2_Fixed.onnx",
				options,
			),
		]);

		this.retinaFaceSession = retinaFaceSession;
		this.miniFASSession = miniFASSession;
	}

	async processFrame(
		videoElement: HTMLVideoElement,
	): Promise<FaceLivenessResult | null> {
		if (!this.retinaFaceSession || !this.miniFASSession) {
			throw new Error("Face liveness models are not loaded.");
		}

		const faces = await this.detectFaces(videoElement);
		if (faces.length === 0) {
			this.stabilityCounter = 0;
			return null;
		}

		const face = faces.reduce((prev, curr) =>
			this.boxArea(curr) > this.boxArea(prev) ? curr : prev,
		);
		const livenessRaw = await this.checkLivenessRaw(videoElement, face);

		let label: "FAKE" | "REAL" | "VERIFYING..." = "FAKE";
		let isReal = false;

		if (livenessRaw.isRealRaw) {
			this.stabilityCounter++;
			if (this.stabilityCounter >= REQUIRED_CONSECUTIVE_REAL) {
				label = "REAL";
				isReal = true;
				this.stabilityCounter = REQUIRED_CONSECUTIVE_REAL + 1;
			} else {
				label = "VERIFYING...";
			}
		} else {
			this.stabilityCounter = 0;
		}

		return {
			bbox: face,
			liveness: {
				isRealRaw: livenessRaw.isRealRaw,
				isReal,
				label,
				confidence: livenessRaw.confidence,
				stabilityScore: Math.min(
					this.stabilityCounter,
					REQUIRED_CONSECUTIVE_REAL,
				),
				probabilities: livenessRaw.probabilities,
			},
		};
	}

	private boxArea(face: FaceBox) {
		return Math.max(0, face[2] - face[0]) * Math.max(0, face[3] - face[1]);
	}

	private async detectFaces(videoElement: HTMLVideoElement) {
		if (!this.retinaFaceSession) return [];

		const input = this.preprocessRetinaFace(videoElement);
		const feeds: Record<string, ort.Tensor> = {
			[this.retinaFaceSession.inputNames[0]]: input,
		};
		const results = await this.retinaFaceSession.run(feeds);
		const { loc, conf } = this.extractRetinaFaceOutput(results);

		if (!loc || !conf) return [];

		return this.postProcessRetinaFace(
			loc,
			conf,
			this.anchors,
			videoElement.videoWidth,
			videoElement.videoHeight,
		);
	}

	private async checkLivenessRaw(
		videoElement: HTMLVideoElement,
		face: FaceBox,
	): Promise<RawLivenessResult> {
		if (!this.miniFASSession) {
			throw new Error("MiniFASNet session is not loaded.");
		}

		const faceCrop = this.cropFace(videoElement, face, MINIFAS_CONFIG.inputSize);
		const input = this.preprocessMiniFASNet(faceCrop);
		const feeds: Record<string, ort.Tensor> = {
			[this.miniFASSession.inputNames[0]]: input,
		};
		const results = await this.miniFASSession.run(feeds);
		const outputData = results[this.miniFASSession.outputNames[0]]
			.data as Float32Array;

		const class0 = outputData[0] ?? -999;
		const class1 = outputData[1] ?? -999;
		const class2 = outputData[2] ?? -999;
		const maxVal = Math.max(class0, class1, class2);
		const exp0 = Math.exp(class0 - maxVal);
		const exp1 = Math.exp(class1 - maxVal);
		const exp2 = Math.exp(class2 - maxVal);
		const sumExp = exp0 + exp1 + exp2;
		const prob0 = exp0 / sumExp;
		const prob1 = exp1 / sumExp;
		const prob2 = exp2 / sumExp;

		let predClass = 0;
		let confidence = prob0;
		if (prob1 > confidence) {
			predClass = 1;
			confidence = prob1;
		}
		if (prob2 > confidence) {
			predClass = 2;
			confidence = prob2;
		}

		return {
			isRealRaw:
				predClass === 1 && confidence > MINIFAS_CONFIG.realThreshold,
			rawLabel: predClass === 1 ? "REAL" : "FAKE",
			confidence,
			probabilities: {
				fakePrint: prob0,
				real: prob1,
				fakeScreen: prob2,
			},
		};
	}

	private preprocessMiniFASNet(imageData: ImageData) {
		const { data } = imageData;
		const size = MINIFAS_CONFIG.inputSize;
		const totalPixels = size * size;
		const float32Data = new Float32Array(1 * 3 * size * size);

		for (let i = 0; i < totalPixels; i++) {
			const r = data[i * 4];
			const g = data[i * 4 + 1];
			const b = data[i * 4 + 2];
			float32Data[i] = b;
			float32Data[i + totalPixels] = g;
			float32Data[i + totalPixels * 2] = r;
		}

		return new ort.Tensor("float32", float32Data, [1, 3, size, size]);
	}

	private preprocessRetinaFace(videoElement: HTMLVideoElement) {
		const size = RF_CONFIG.inputSize;
		const canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;

		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Unable to create canvas context.");

		ctx.drawImage(videoElement, 0, 0, size, size);
		const { data } = ctx.getImageData(0, 0, size, size);
		const float32Data = new Float32Array(1 * 3 * size * size);

		for (let i = 0; i < size * size; i++) {
			const r = data[i * 4];
			const g = data[i * 4 + 1];
			const b = data[i * 4 + 2];
			float32Data[i] = b - 104;
			float32Data[i + size * size] = g - 117;
			float32Data[i + size * size * 2] = r - 123;
		}

		return new ort.Tensor("float32", float32Data, [1, 3, size, size]);
	}

	private cropFace(
		videoElement: HTMLVideoElement,
		face: FaceBox,
		targetSize: number,
	) {
		const [x1, y1, x2, y2] = face;
		const width = x2 - x1;
		const height = y2 - y1;
		const scaleFactor = 1.5;
		const newWidth = width * scaleFactor;
		const newHeight = height * scaleFactor;
		const centerX = x1 + width / 2;
		const centerY = y1 + height / 2;
		const cropX = centerX - newWidth / 2;
		const cropY = centerY - newHeight / 2;
		const srcX = Math.max(0, cropX);
		const srcY = Math.max(0, cropY);
		const srcW = Math.min(
			videoElement.videoWidth - srcX,
			newWidth - (srcX - cropX),
		);
		const srcH = Math.min(
			videoElement.videoHeight - srcY,
			newHeight - (srcY - cropY),
		);

		if (srcW <= 0 || srcH <= 0) return new ImageData(targetSize, targetSize);

		let canvas = document.createElement("canvas");
		canvas.width = srcW;
		canvas.height = srcH;
		let ctx = canvas.getContext("2d");
		if (!ctx) return new ImageData(targetSize, targetSize);

		ctx.translate(srcW, 0);
		ctx.scale(-1, 1);
		ctx.drawImage(videoElement, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);

		let curW = srcW;
		let curH = srcH;
		while (curW > targetSize * 2) {
			const nextW = Math.floor(curW * 0.5);
			const nextH = Math.floor(curH * 0.5);
			const tempCanvas = document.createElement("canvas");
			tempCanvas.width = nextW;
			tempCanvas.height = nextH;
			const tempCtx = tempCanvas.getContext("2d");
			if (!tempCtx) break;
			tempCtx.drawImage(canvas, 0, 0, curW, curH, 0, 0, nextW, nextH);
			canvas = tempCanvas;
			curW = nextW;
			curH = nextH;
		}

		const finalCanvas = document.createElement("canvas");
		finalCanvas.width = targetSize;
		finalCanvas.height = targetSize;
		const finalCtx = finalCanvas.getContext("2d");
		if (!finalCtx) return new ImageData(targetSize, targetSize);

		finalCtx.filter = "blur(0.5px)";
		finalCtx.fillStyle = "black";
		finalCtx.fillRect(0, 0, targetSize, targetSize);
		finalCtx.drawImage(canvas, 0, 0, curW, curH, 0, 0, targetSize, targetSize);

		return finalCtx.getImageData(0, 0, targetSize, targetSize);
	}

	private generateAnchors(inputSize: number) {
		const featureMaps = [
			[Math.ceil(inputSize / 8), Math.ceil(inputSize / 8)],
			[Math.ceil(inputSize / 16), Math.ceil(inputSize / 16)],
			[Math.ceil(inputSize / 32), Math.ceil(inputSize / 32)],
		];
		const minSizes = [
			[16, 32],
			[64, 128],
			[256, 512],
		];
		const steps = [8, 16, 32];
		const anchors: number[][] = [];

		featureMaps.forEach((fmap, idx) => {
			const step = steps[idx];
			for (let i = 0; i < fmap[0]; i++) {
				for (let j = 0; j < fmap[1]; j++) {
					for (const size of minSizes[idx]) {
						anchors.push([
							((j + 0.5) * step) / inputSize,
							((i + 0.5) * step) / inputSize,
							size / inputSize,
							size / inputSize,
						]);
					}
				}
			}
		});

		return anchors;
	}

	private extractRetinaFaceOutput(results: ort.InferenceSession.OnnxValueMapType) {
		const inputSize = RF_CONFIG.inputSize;
		const strides = [8, 16, 32];
		const totalAnchors = 16800;
		const combinedLoc = new Float32Array(totalAnchors * 4);
		const combinedConf = new Float32Array(totalAnchors * 2);
		let offset = 0;

		for (const stride of strides) {
			const sz = inputSize / stride;
			const numAnchors = sz * sz * 2;
			let tensorLoc: Float32Array | null = null;
			let tensorConf: Float32Array | null = null;

			for (const key in results) {
				const value = results[key];
				if (!("dims" in value) || !("data" in value)) continue;

				const dims = value.dims;
				if (dims[2] === sz && dims[3] === sz) {
					if (dims[1] === 8) tensorLoc = value.data as Float32Array;
					if (dims[1] === 4) tensorConf = value.data as Float32Array;
				}
			}

			if (!tensorLoc || !tensorConf) {
				offset += numAnchors;
				continue;
			}

			for (let h = 0; h < sz; h++) {
				for (let w = 0; w < sz; w++) {
					for (let a = 0; a < 2; a++) {
						const targetIdx = offset + (h * sz + w) * 2 + a;
						for (let i = 0; i < 4; i++) {
							const channel = a * 4 + i;
							combinedLoc[targetIdx * 4 + i] =
								tensorLoc[channel * (sz * sz) + h * sz + w];
						}
						for (let i = 0; i < 2; i++) {
							const channel = a * 2 + i;
							combinedConf[targetIdx * 2 + i] =
								tensorConf[channel * (sz * sz) + h * sz + w];
						}
					}
				}
			}

			offset += numAnchors;
		}

		return {
			loc: combinedLoc,
			conf: combinedConf,
		};
	}

	private postProcessRetinaFace(
		loc: Float32Array,
		conf: Float32Array,
		anchors: number[][],
		videoWidth: number,
		videoHeight: number,
	) {
		const faces: FaceBox[] = [];
		const [var0, var1] = RF_CONFIG.variance;

		for (let i = 0; i < anchors.length; i++) {
			const score = conf[i * 2 + 1];
			if (score <= RF_CONFIG.confThreshold) continue;

			const anchor = anchors[i];
			const dx = loc[i * 4];
			const dy = loc[i * 4 + 1];
			const dw = loc[i * 4 + 2];
			const dh = loc[i * 4 + 3];
			const cx = anchor[0] + dx * var0 * anchor[2];
			const cy = anchor[1] + dy * var0 * anchor[3];
			const w = anchor[2] * Math.exp(dw * var1);
			const h = anchor[3] * Math.exp(dh * var1);
			const x1 = (cx - w / 2) * videoWidth;
			const y1 = (cy - h / 2) * videoHeight;
			const x2 = (cx + w / 2) * videoWidth;
			const y2 = (cy + h / 2) * videoHeight;
			faces.push([x1, y1, x2, y2, score]);
		}

		return this.nms(faces, RF_CONFIG.nmsThreshold);
	}

	private nms(boxes: FaceBox[], threshold: number) {
		if (boxes.length === 0) return [];

		boxes.sort((a, b) => b[4] - a[4]);
		const selected: FaceBox[] = [];
		const active = new Array(boxes.length).fill(true);

		for (let i = 0; i < boxes.length; i++) {
			if (!active[i]) continue;
			const boxA = boxes[i];
			selected.push(boxA);

			for (let j = i + 1; j < boxes.length; j++) {
				if (!active[j]) continue;
				const boxB = boxes[j];
				const xx1 = Math.max(boxA[0], boxB[0]);
				const yy1 = Math.max(boxA[1], boxB[1]);
				const xx2 = Math.min(boxA[2], boxB[2]);
				const yy2 = Math.min(boxA[3], boxB[3]);
				const w = Math.max(0, xx2 - xx1);
				const h = Math.max(0, yy2 - yy1);
				const inter = w * h;
				const areaA = this.boxArea(boxA);
				const areaB = this.boxArea(boxB);
				const union = areaA + areaB - inter;

				if (union > 0 && inter / union > threshold) {
					active[j] = false;
				}
			}
		}

		return selected;
	}
}

export const LIVENESS_REQUIRED_FRAMES = REQUIRED_CONSECUTIVE_REAL;
