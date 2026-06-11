"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	AlertCircle,
	Camera,
	Shield,
	RefreshCw,
	ArrowLeft,
	ScanFace,
	XCircle,
	Info,
	Save,
	Loader2,
	TicketX,
	Send,
	Maximize2,
	X,
} from "lucide-react";
import { RiEmotionFill, RiSunFill, RiSurgicalMaskLine } from "@remixicon/react";
import Webcam from "react-webcam";
import { useRouter } from "next/navigation";
import {
	useVerification,
	useVerificationGuard,
} from "../../VerificationContext";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import {
	FaceLivenessDetector,
	LIVENESS_REQUIRED_FRAMES,
	type FaceLivenessStatus,
} from "@/lib/face-liveness-detector";
import HeaderSection from "../../components/HeaderSection";
import {
	getApiErrorMessage,
	submitBiometricData,
} from "@/services/verification.service";
import { Modal } from "../../components/Modal";
import { useHandleSubmit } from "@/hooks/use-handle-submit";
type VerificationState = "verifying" | "success" | "failed";

// Face frame config (SVG viewBox 1280x720). The detection area stays forgiving,
// while the visible path follows a more natural forehead, cheek, jaw, and chin.
type FrameCfg = {
	cx: number;
	cy: number;
	rx: number;
	ry: number;
	minFace: number; // min face width as a fraction of SVG width
	maxScale: number; // max face width = rx * 2 * maxScale
	centerTolerance: number; // allow natural head movement within the guide
	shoulderWidth: number;
};
const FRAME: Record<"desktop" | "mobile", FrameCfg> = {
	desktop: {
		cx: 640,
		cy: 300,
		rx: 190,
		ry: 225,
		minFace: 0.15,
		maxScale: 1.8,
		centerTolerance: 1.05,
		shoulderWidth: 1.35,
	},
	mobile: {
		cx: 640,
		cy: 330,
		rx: 250,
		ry: 300,
		minFace: 0.13,
		maxScale: 2.75,
		centerTolerance: 1.22,
		shoulderWidth: 1.75,
	},
};

const CAMERA_READY_CHECK_DELAY_MS = 1200;
const CAMERA_RESTART_DELAY_MS = 900;
const MAX_CAMERA_RESTART_ATTEMPTS = 4;
const FACE_DETECTION_INTERVAL_DESKTOP_MS = 400;
const FACE_DETECTION_INTERVAL_MOBILE_MS = 1200;
const CAMERA_VIDEO_CONSTRAINTS: MediaTrackConstraints[] = [
	{ facingMode: { ideal: "user" } },
	{ facingMode: "user" },
	{},
];

/** Helper: base64 data-url → Blob */
function dataURLtoBlob(dataURL: string): Blob {
	const arr = dataURL.split(",");
	const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
	const bstr = atob(arr[1]);
	const u8 = new Uint8Array(bstr.length);
	for (let i = 0; i < bstr.length; i++) u8[i] = bstr.charCodeAt(i);
	return new Blob([u8], { type: mime });
}

function isWebcamStreamReady(webcam: Webcam | null): boolean {
	const video = webcam?.video;
	const track = webcam?.stream?.getVideoTracks()[0];

	return Boolean(
		video &&
		video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
		video.videoWidth > 0 &&
		video.videoHeight > 0 &&
		track &&
		track.readyState === "live" &&
		track.enabled &&
		!track.muted,
	);
}

function hasVisibleVideoFrame(video: HTMLVideoElement): boolean {
	try {
		const canvas = document.createElement("canvas");
		canvas.width = 32;
		canvas.height = 32;
		const ctx = canvas.getContext("2d", { willReadFrequently: true });
		if (!ctx) return false;

		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
		let visiblePixels = 0;

		for (let i = 0; i < pixels.length; i += 4) {
			if (pixels[i] + pixels[i + 1] + pixels[i + 2] > 24) visiblePixels++;
		}

		return visiblePixels / (pixels.length / 4) > 0.02;
	} catch {
		return false;
	}
}

export default function FaceVerificationPage() {
	const [state, setState] = useState<VerificationState>("verifying");
	const [faceInFrame, setFaceInFrame] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [tncAccepted, setTncAccepted] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);
	const webcamRef = useRef<Webcam>(null);
	const faceBlobRef = useRef<Blob | null>(null);
	const router = useRouter();
	const { faceBlob, kodeTiket, clearVerification, setFaceBlob } =
		useVerification();
	const allowed = useVerificationGuard("face");

	const { handleSubmitWithFaceBlob, handleErrorClose } = useHandleSubmit({
		faceBlob,
		kodeTiket,
		errorMsg,
		setErrorMsg,
		setSubmitting,
		submitBiometricData,
		getApiErrorMessage,
	});

	const returnToTicket = useCallback(() => {
		webcamRef.current?.stream?.getTracks().forEach((track) => track.stop());
		clearVerification();
		router.push("/verification/ticket");
	}, [clearVerification, router]);

	const capture = useCallback(() => {
		if (!webcamRef.current || submitting) return;
		if (!faceInFrame || !isWebcamStreamReady(webcamRef.current)) {
			setFaceInFrame(false);
			setErrorMsg(
				"Kamera tidak aktif. Pastikan wajah terlihat lalu coba lagi.",
			);
			return;
		}

		const video = webcamRef.current.video as HTMLVideoElement | undefined;
		if (!video || !hasVisibleVideoFrame(video)) {
			setFaceInFrame(false);
			setErrorMsg("Tampilan kamera tidak terlihat. Silakan coba lagi.");
			return;
		}

		const w = video.videoWidth;
		const h = video.videoHeight;
		const imgSrc = webcamRef.current.getScreenshot({ width: w, height: h });
		if (!imgSrc) {
			setFaceInFrame(false);
			setErrorMsg(
				"Foto wajah gagal diambil. Pastikan kamera aktif lalu coba lagi.",
			);
			return;
		}

		const capturedFaceBlob = dataURLtoBlob(imgSrc);
		faceBlobRef.current = capturedFaceBlob;
		setFaceBlob(capturedFaceBlob);
		webcamRef.current.stream?.getTracks().forEach((track) => track.stop());
		setState("success");
	}, [faceInFrame, setErrorMsg, setFaceBlob, submitting]);

	const confirmSubmit = useCallback(async () => {
		const capturedFaceBlob = faceBlobRef.current ?? faceBlob;
		if (!capturedFaceBlob) {
			setErrorMsg("Data wajah belum tersedia. Silakan ambil foto kembali.");
			return;
		}

		await handleSubmitWithFaceBlob(capturedFaceBlob);
	}, [faceBlob, handleSubmitWithFaceBlob, setErrorMsg]);

	if (!allowed) return null;

	return (
		<>
			<HeaderSection />

			<Modal
				open={!!errorMsg}
				onClose={returnToTicket}
				title="Registrasi Gagal"
				description={errorMsg}
			/>

			<div className="space-y-6">
				{/* Main Card */}
				<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
					{/* Card Header */}
					<div className="relative flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 gap-2">
						<div className="flex items-center gap-2 min-w-0">
							<ScanFace className="w-5 h-5 text-[#3b5bdb] shrink-0" />
							<span className="font-semibold text-[#1e2a4a] truncate">
								Pendaftaran Wajah
							</span>
						</div>
						<span
							className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${
								state === "success"
									? "text-emerald-600 bg-emerald-50 border-emerald-200"
									: "text-[#3b5bdb] bg-blue-50 border-blue-200"
							}`}>
							{state === "success" ? "Konfirmasi" : "Langkah 2 dari 2"}
						</span>
					</div>

					{/* Card Body */}
					<div className="px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center text-center">
						{state === "failed" && <FailedState />}
						{state === "success" && (
							<SuccessState
								faceBlob={faceBlobRef.current ?? faceBlob}
								isMobile={isMobile}
								tncAccepted={tncAccepted}
								setTncAccepted={setTncAccepted}
							/>
						)}
						{state === "verifying" && (
							<VerifyingState
								webcamRef={webcamRef}
								faceInFrame={faceInFrame}
								setFaceInFrame={setFaceInFrame}
								onCapture={capture}
								onBackToTicket={returnToTicket}
								isMobile={isMobile}
								submitting={submitting}
							/>
						)}
					</div>

					{/* Card Footer */}
					<div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 flex items-center justify-between">
						{state === "failed" && (
							<button
								onClick={() => setState("verifying")}
								className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#3b5bdb] text-white font-medium text-sm hover:bg-[#3451c5] transition-colors">
								<RefreshCw className="w-4 h-4" />
								Ulangi
							</button>
						)}
						{state === "verifying" && (
							<>
								<button
									disabled={submitting}
									onClick={returnToTicket}
									className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors ${
										submitting ? "opacity-60 cursor-not-allowed" : ""
									}`}>
									<ArrowLeft className="w-4 h-4" />
									Kembali
								</button>
								{/* Desktop-only capture button in footer */}
								{!isMobile && (
									<button
										disabled={!faceInFrame || submitting}
										onClick={capture}
										className={`ml-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-colors ${
											faceInFrame && !submitting
												? "bg-[#3b5bdb] hover:bg-[#3451c5]"
												: "bg-gray-300 cursor-not-allowed"
										}`}>
										{submitting ? (
											<Loader2 className="w-4 h-4 animate-spin" />
										) : (
											<Camera className="w-4 h-4" />
										)}
										{submitting ? "Mengirim..." : "Ambil Foto"}
									</button>
								)}
							</>
						)}
						{state === "success" && (
							<div className="flex w-full flex-wrap items-center justify-between gap-3">
								<button
									type="button"
									disabled={submitting}
									onClick={returnToTicket}
									className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 ${
										submitting ? "cursor-not-allowed opacity-60" : ""
									}`}>
									<TicketX className="h-4 w-4" />
									Batal
								</button>
								<button
									type="button"
									disabled={submitting || !tncAccepted}
									onClick={confirmSubmit}
									className={`inline-flex items-center gap-2 rounded-lg bg-[#3b5bdb] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3451c5] ${
										submitting || !tncAccepted
											? "cursor-not-allowed opacity-70"
											: ""
									}`}>
									{submitting ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										<Send className="h-4 w-4" />
									)}
									{submitting ? "Mengirim..." : "Kirim"}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

/* ---------- Sub-components ---------- */

function FailedState() {
	return (
		<>
			{/* Error Icon */}
			<div className="relative mb-6">
				<div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
					<div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
						<AlertCircle className="w-10 h-10 text-red-500" />
					</div>
				</div>
			</div>

			<h2 className="text-xl font-bold text-[#1e2a4a] mb-2">
				Verifikasi Gagal
			</h2>
			<p className="text-gray-500 text-sm max-w-md mb-6">
				Kami tidak dapat memverifikasi wajah Anda. Mohon periksa kembali kondisi
				pengambilan foto berikut:
			</p>

			{/* Error Tips */}
			<div className="bg-red-50 border border-red-100 rounded-xl px-6 py-5 w-full max-w-md text-left space-y-4">
				<div className="flex items-start gap-3">
					<XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
					<div>
						<p className="font-semibold text-red-600 text-sm">
							Pencahayaan kurang terang
						</p>
						<p className="text-gray-500 text-xs mt-0.5">
							Pastikan wajah tersinari dengan baik.
						</p>
					</div>
				</div>
				<div className="flex items-start gap-3">
					<XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
					<div>
						<p className="font-semibold text-red-600 text-sm">
							Wajah tidak terdeteksi sepenuhnya
						</p>
						<p className="text-gray-500 text-xs mt-0.5">
							Lepaskan masker atau kacamata hitam.
						</p>
					</div>
				</div>
				<div className="flex items-start gap-3">
					<XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
					<div>
						<p className="font-semibold text-red-600 text-sm">
							Posisi wajah miring
						</p>
						<p className="text-gray-500 text-xs mt-0.5">
							Harap pandangan lurus ke depan.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

function SuccessState({
	faceBlob,
	isMobile,
	tncAccepted,
	setTncAccepted,
}: {
	faceBlob: Blob | null;
	isMobile: boolean;
	tncAccepted: boolean;
	setTncAccepted: (val: boolean) => void;
}) {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	useEffect(() => {
		if (!faceBlob) {
			setPreviewUrl(null);
			return;
		}

		const url = URL.createObjectURL(faceBlob);
		setPreviewUrl(url);

		return () => URL.revokeObjectURL(url);
	}, [faceBlob]);

	const frame = isMobile ? FRAME.mobile : FRAME.desktop;

	return (
		<div className="flex w-full flex-col items-center mx-auto">
			{/* Compact Text-only T&C */}
			<div className="w-full mb-6 text-left">
				<div className="flex items-center gap-2 mb-3">
					<Shield className="h-5 w-5 text-[#3b5bdb]" />
					<h2 className="text-base font-bold text-[#1e2a4a]">
						Syarat & Ketentuan Pendaftaran Face ID
					</h2>
				</div>
				<p className="mb-4 text-sm leading-relaxed text-gray-600 font-medium">
					Dengan melakukan registrasi Face ID, saya menyatakan telah membaca,
					memahami, dan menyetujui ketentuan berikut:
				</p>
				<div className="flex flex-col space-y-3 text-sm leading-relaxed text-gray-600">
					{[
						"Saya hanya mendaftarkan 1 (satu) wajah untuk 1 (satu) kode tiket/1 (satu) barcode yang dimiliki.",
						"Data wajah yang saya daftarkan adalah data diri saya sendiri dan bukan milik orang lain.",
						"Wajah yang telah didaftarkan akan digunakan sebagai salah satu metode verifikasi saat memasuki area Jomlo Fest.",
						"Tiket dengan Face ID yang telah terdaftar tidak dapat digunakan oleh orang lain.",
						"Dengan melanjutkan proses pendaftaran Face ID, saya menyetujui seluruh syarat dan ketentuan yang berlaku.",
					].map((text, i) => (
						<div key={i} className="flex items-start gap-2">
							<span className="font-semibold w-4 shrink-0 text-right">
								{i + 1}.
							</span>
							<p>{text}</p>
						</div>
					))}
				</div>
				<div className="mt-4 flex items-center gap-2">
					<input
						type="checkbox"
						id="tnc"
						className="peer size-4 shrink-0 cursor-pointer rounded-lg border border-gray-900 shadow-xs transition-shadow outline-none focus-visible:ring-[3px] focus-visible:ring-[#3b5bdb]/50 disabled:cursor-not-allowed disabled:opacity-50 accent-[#3b5bdb]"
						checked={tncAccepted}
						onChange={(e) => setTncAccepted(e.target.checked)}
					/>

					<label
						htmlFor="tnc"
						className="text-sm font-bold leading-relaxed text-[#1e2a4a] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Saya telah membaca dan menyetujui syarat & ketentuan di atas.
					</label>
				</div>
			</div>

			{previewUrl ? (
				<Dialog>
					<DialogTrigger asChild>
						<button
							type="button"
							className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3b5bdb] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#3451c5] active:scale-95">
							<Maximize2 className="h-4 w-4" />
							<span>Lihat Hasil Capture Wajah</span>
						</button>
					</DialogTrigger>
					<DialogContent
						className="border-0 bg-transparent p-0 shadow-none"
						showCloseButton={false}>
						<DialogHeader className="sr-only">
							<DialogTitle>Preview Foto Wajah</DialogTitle>
						</DialogHeader>
						{/* Matching aspect ratio to camera */}
						<div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl bg-gray-950 aspect-3/4 sm:aspect-video ring-1 ring-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
							<img
								src={previewUrl}
								alt="Preview"
								className="absolute inset-0 block h-full w-full object-cover scale-x-[-1]"
							/>
							<DialogClose className="absolute right-4 top-4 z-50 flex aspect-square h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/50 p-0 text-white backdrop-blur-md transition-all hover:bg-black/70 focus:outline-none active:scale-95">
								<X className="h-5 w-5" />
								<span className="sr-only">Tutup preview</span>
							</DialogClose>
						</div>
					</DialogContent>
				</Dialog>
			) : (
				<div className="flex w-full items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-8 text-xs text-gray-500">
					Preview tidak tersedia.
				</div>
			)}
		</div>
	);
}

function VerifyingState({
	webcamRef,
	faceInFrame,
	setFaceInFrame,
	onCapture,
	onBackToTicket,
	isMobile,
	submitting,
}: {
	webcamRef: React.RefObject<Webcam | null>;
	faceInFrame: boolean;
	setFaceInFrame: (val: boolean) => void;
	onCapture: () => void;
	onBackToTicket: () => void;
	isMobile: boolean;
	submitting: boolean;
}) {
	const [livenessStatus, setLivenessStatus] =
		useState<FaceLivenessStatus>("loading");
	const [livenessScore, setLivenessScore] = useState<number | null>(null);
	const [stabilityScore, setStabilityScore] = useState(0);
	const [cameraConstraintIndex, setCameraConstraintIndex] = useState(0);
	const [cameraMounted, setCameraMounted] = useState(true);
	const [frame, setFrame] = useState<FrameCfg>(FRAME.desktop);
	const frameRef = useRef<FrameCfg>(FRAME.desktop);
	const detectorRef = useRef<FaceLivenessDetector | null>(null);
	const livenessDisabledRef = useRef(false);
	const hasLoggedLivenessErrorRef = useRef(false);
	const isProcessingRef = useRef(false);
	const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
	const [cameraFailed, setCameraFailed] = useState(false);
	const [cameraInstanceKey, setCameraInstanceKey] = useState(0);
	const cameraRestartAttemptsRef = useRef(0);
	const cameraRestartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);
	const cameraReadyCheckTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);
	const intentionalCameraRestartRef = useRef(false);

	const resetDetection = useCallback(
		(status: FaceLivenessStatus = "loading") => {
			setFaceInFrame(false);
			setLivenessStatus(status);
			setLivenessScore(null);
			setStabilityScore(0);
		},
		[setFaceInFrame],
	);

	const restartCamera = useCallback(() => {
		if (submitting || cameraRestartTimerRef.current) return;

		if (cameraRestartAttemptsRef.current >= MAX_CAMERA_RESTART_ATTEMPTS) {
			setCameraFailed(true);
			resetDetection("error");
			return;
		}

		setCameraFailed(false);
		resetDetection();
		intentionalCameraRestartRef.current = true;

		if (cameraReadyCheckTimerRef.current) {
			clearTimeout(cameraReadyCheckTimerRef.current);
			cameraReadyCheckTimerRef.current = null;
		}

		webcamRef.current?.stream?.getTracks().forEach((track) => track.stop());
		setCameraStream(null);
		setCameraMounted(false);

		cameraRestartTimerRef.current = setTimeout(() => {
			cameraRestartTimerRef.current = null;
			cameraRestartAttemptsRef.current++;
			setCameraConstraintIndex(
				(current) => (current + 1) % CAMERA_VIDEO_CONSTRAINTS.length,
			);
			setCameraInstanceKey((current) => current + 1);
			setCameraMounted(true);
		}, CAMERA_RESTART_DELAY_MS);
	}, [resetDetection, submitting, webcamRef]);

	const retryCamera = useCallback(() => {
		cameraRestartAttemptsRef.current = 0;
		setCameraFailed(false);
		restartCamera();
	}, [restartCamera]);

	const handleVideoInterrupted = useCallback(() => {
		if (!intentionalCameraRestartRef.current) restartCamera();
	}, [restartCamera]);

	const verifyCameraPlayback = useCallback(() => {
		if (intentionalCameraRestartRef.current) return;

		if (cameraReadyCheckTimerRef.current) {
			clearTimeout(cameraReadyCheckTimerRef.current);
		}

		cameraReadyCheckTimerRef.current = setTimeout(() => {
			cameraReadyCheckTimerRef.current = null;
			const webcam = webcamRef.current;
			const video = webcam?.video;

			if (
				!video ||
				video.paused ||
				!isWebcamStreamReady(webcam) ||
				!hasVisibleVideoFrame(video)
			) {
				restartCamera();
				return;
			}

			if (cameraRestartTimerRef.current) {
				clearTimeout(cameraRestartTimerRef.current);
				cameraRestartTimerRef.current = null;
			}
			cameraRestartAttemptsRef.current = 0;
		}, CAMERA_READY_CHECK_DELAY_MS);
	}, [restartCamera, webcamRef]);

	const handleUserMedia = useCallback(
		(stream: MediaStream) => {
			intentionalCameraRestartRef.current = false;
			setCameraFailed(false);
			setCameraStream(stream);
			resetDetection();
			void webcamRef.current?.video?.play().catch(() => restartCamera());
			verifyCameraPlayback();
		},
		[resetDetection, restartCamera, verifyCameraPlayback, webcamRef],
	);

	const handleUserMediaError = useCallback(
		(error: string | DOMException) => {
			console.warn("Failed to access camera:", error);
			intentionalCameraRestartRef.current = false;
			setCameraStream(null);
			restartCamera();
		},
		[restartCamera],
	);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const cfg = isMobile ? FRAME.mobile : FRAME.desktop;
			setFrame(cfg);
			frameRef.current = cfg;
		}
	}, [isMobile]);

	useEffect(() => {
		const track = cameraStream?.getVideoTracks()[0];
		if (!track) return;

		const handleMuted = () => verifyCameraPlayback();
		const handleEnded = () => handleVideoInterrupted();

		track.addEventListener("mute", handleMuted);
		track.addEventListener("unmute", verifyCameraPlayback);
		track.addEventListener("ended", handleEnded);

		return () => {
			track.removeEventListener("mute", handleMuted);
			track.removeEventListener("unmute", verifyCameraPlayback);
			track.removeEventListener("ended", handleEnded);
		};
	}, [cameraStream, handleVideoInterrupted, verifyCameraPlayback]);

	useEffect(() => {
		return () => {
			if (cameraRestartTimerRef.current) {
				clearTimeout(cameraRestartTimerRef.current);
			}
			if (cameraReadyCheckTimerRef.current) {
				clearTimeout(cameraReadyCheckTimerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		let intervalId: ReturnType<typeof setInterval>;
		let mounted = true;

		async function loadAndDetect() {
			livenessDisabledRef.current = false;
			hasLoggedLivenessErrorRef.current = false;

			try {
				setLivenessStatus("loading");
				setFaceInFrame(false);
				const detector = new FaceLivenessDetector();
				// await detector.loadModels();
				await detector.loadModels({ includeLiveness: false });
				detectorRef.current = detector;
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				console.warn(`Failed to load face detection model: ${message}`);
				if (mounted) {
					setLivenessStatus("error");
					setFaceInFrame(false);
				}
				return;
			}

			if (!mounted) return;

			intervalId = setInterval(
				async () => {
					const webcam = webcamRef.current;
					const video = webcam?.video as HTMLVideoElement | undefined;
					if (!video || !isWebcamStreamReady(webcam)) {
						resetDetection();
						return;
					}
					if (!detectorRef.current || isProcessingRef.current) return;
					if (livenessDisabledRef.current) return;

					isProcessingRef.current = true;

					try {
						const result = await detectorRef.current.processFaceFrame(video);
						// Anti-spoofing & liveness are intentionally disabled.
						// const result = await detectorRef.current.processFrame(video);

						if (!mounted) return;
						if (!isWebcamStreamReady(webcamRef.current)) {
							resetDetection();
							return;
						}

						if (!result) {
							resetDetection("no-face");
							return;
						}

						const [x1, y1, x2, y2] = result.bbox;
						const width = x2 - x1;
						const height = y2 - y1;
						const vw = video.videoWidth;
						const vh = video.videoHeight;
						const W = video.clientWidth;
						const H = video.clientHeight;

						if (vw === 0 || vh === 0 || W === 0 || H === 0) {
							resetDetection();
							return;
						}

						// Calculate Display Scale for Video
						const Sv = Math.max(W / vw, H / vh);
						const videoScaledWidth = vw * Sv;
						const videoScaledHeight = vh * Sv;
						const videoOffsetX = (videoScaledWidth - W) / 2;
						const videoOffsetY = (videoScaledHeight - H) / 2;

						// Calculate Display Scale for SVG
						const SVG_W = 1280;
						const SVG_H = 720;
						const Ss = Math.max(W / SVG_W, H / SVG_H);
						const svgScaledWidth = SVG_W * Ss;
						const svgScaledHeight = SVG_H * Ss;
						const svgOffsetX = (svgScaledWidth - W) / 2;
						const svgOffsetY = (svgScaledHeight - H) / 2;

						// Physical pixels center
						const faceCenterVideoX = (x1 + x2) / 2;
						const faceCenterVideoY = (y1 + y2) / 2;
						const px = faceCenterVideoX * Sv - videoOffsetX;
						const py = faceCenterVideoY * Sv - videoOffsetY;

						// Map physical to SVG
						const faceCenterX = (px + svgOffsetX) / Ss;
						const faceCenterY = (py + svgOffsetY) / Ss;
						const faceWidth = (width * Sv) / Ss;
						const faceHeight = (height * Sv) / Ss;

						// Check if face center is inside the oval
						const cfg = frameRef.current;
						const dxCenter = (faceCenterX - cfg.cx) / cfg.rx;
						const dyCenter = (faceCenterY - cfg.cy) / cfg.ry;
						const isCenterInOval =
							dxCenter * dxCenter + dyCenter * dyCenter <=
							cfg.centerTolerance * cfg.centerTolerance;

						// Face size checks
						const guideWidth = cfg.rx * 2;
						const guideHeight = cfg.ry * 2;
						const minFaceWidth = Math.max(
							SVG_W * cfg.minFace,
							guideWidth * 0.5,
						);
						const minFaceHeight = guideHeight * 0.55;
						const isLargeEnough = faceWidth >= minFaceWidth;
						const isTallEnough = faceHeight >= minFaceHeight;

						const maxFaceWidth = guideWidth * cfg.maxScale;
						const isNotTooLarge = faceWidth <= maxFaceWidth;

						const isInFrame =
							isCenterInOval && isLargeEnough && isTallEnough && isNotTooLarge;

						/*
					Anti-spoofing & liveness flow preserved for future use:

					const isLive = result.liveness.isReal;
					const isReady = isInFrame && isLive;
					setFaceInFrame(isReady);
					setLivenessScore(result.liveness.probabilities.real);
					setStabilityScore(result.liveness.stabilityScore);

					if (!isInFrame) {
						setLivenessStatus("out-of-frame");
					} else if (isLive) {
						setLivenessStatus("real");
					} else if (result.liveness.isRealRaw) {
						setLivenessStatus("verifying");
					} else {
						setLivenessStatus("fake");
					}
					*/

						setFaceInFrame(isInFrame);
						setLivenessScore(null);
						setStabilityScore(0);

						if (!isInFrame) {
							setLivenessStatus("out-of-frame");
						} else {
							setLivenessStatus("real");
						}
					} catch (error) {
						livenessDisabledRef.current = true;

						if (!hasLoggedLivenessErrorRef.current) {
							const message =
								error instanceof Error ? error.message : String(error);
							console.warn(`Face detection disabled: ${message}`);
							hasLoggedLivenessErrorRef.current = true;
						}

						if (mounted) {
							setFaceInFrame(false);
							setLivenessStatus("error");
						}

						if (intervalId) clearInterval(intervalId);
					} finally {
						isProcessingRef.current = false;
					}
				},
				isMobile
					? FACE_DETECTION_INTERVAL_MOBILE_MS
					: FACE_DETECTION_INTERVAL_DESKTOP_MS,
			);
		}

		loadAndDetect();

		return () => {
			mounted = false;
			if (intervalId) clearInterval(intervalId);
			detectorRef.current = null;
			setFaceInFrame(false);
		};
	}, [isMobile, resetDetection, webcamRef]);

	const borderColor = faceInFrame ? "#16A34A" : "#DC2626";
	const statusMeta = getLivenessStatusMeta(
		livenessStatus,
		livenessScore,
		stabilityScore,
	);

	return (
		<>
			{/* Camera Preview with Face Frame */}
			<div className="relative w-full max-w-lg mb-8 rounded-xl bg-gray-900 aspect-3/4 sm:aspect-video">
				{/* Webcam + SVG overlay wrapper (clips video to rounded corners) */}
				<div className="absolute inset-0 rounded-xl overflow-hidden">
					{cameraMounted && (
						<Webcam
							key={`face-camera-${cameraInstanceKey}`}
							className="absolute inset-0 w-full h-full object-cover"
							audio={false}
							ref={webcamRef}
							screenshotFormat="image/jpeg"
							screenshotQuality={1}
							mirrored
							style={{
								transform: "translateZ(0)",
								backfaceVisibility: "hidden",
								WebkitBackfaceVisibility: "hidden",
								willChange: "transform",
							}}
							videoConstraints={CAMERA_VIDEO_CONSTRAINTS[cameraConstraintIndex]}
							onUserMedia={handleUserMedia}
							onUserMediaError={handleUserMediaError}
							onLoadedMetadata={verifyCameraPlayback}
							onPlaying={verifyCameraPlayback}
							onPause={verifyCameraPlayback}
							onEnded={handleVideoInterrupted}
							onStalled={verifyCameraPlayback}
							onWaiting={verifyCameraPlayback}
						/>
					)}
					{/* Human face outline frame overlay */}
					<svg
						className="absolute inset-0 w-full h-full pointer-events-none"
						viewBox="0 0 1280 720"
						preserveAspectRatio="xMidYMid slice">
						<defs>
							<mask id="face-cutout">
								<rect width="1280" height="720" fill="white" />
								<path d={getFramePath(frame, true)} fill="black" />
							</mask>
						</defs>
						{/* Dark overlay with face-shaped cutout */}
						<rect
							width="1280"
							height="720"
							fill="rgba(0,0,0,0.5)"
							mask="url(#face-cutout)"
						/>
						{/* Head, neck, and shoulder guide */}
						<path
							d={getFramePath(frame)}
							fill="none"
							stroke={borderColor}
							strokeWidth="6"
							strokeLinejoin="round"
							strokeLinecap="round"
							style={{ transition: "stroke 0.3s ease" }}
						/>
					</svg>
				</div>
				{!submitting && (!cameraStream || cameraFailed) && (
					<div
						className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-xl bg-gray-950/70 px-6 text-white"
						role={cameraFailed ? "alert" : "status"}>
						{cameraFailed ? (
							<>
								<p className="text-sm font-semibold">
									Kamera tidak dapat diakses. Tutup tab verifikasi lain atau
									aplikasi yang sedang menggunakan kamera, lalu coba kembali.
								</p>
								<div className="flex flex-wrap items-center justify-center gap-2">
									<button
										type="button"
										onClick={retryCamera}
										className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#101828]">
										<RefreshCw className="h-4 w-4" />
										Coba lagi
									</button>
									<button
										type="button"
										onClick={onBackToTicket}
										className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/10">
										<ArrowLeft className="h-4 w-4" />
										Kembali ke tiket
									</button>
								</div>
							</>
						) : (
							<>
								<Loader2 className="h-8 w-8 animate-spin" />
								<p className="text-sm font-medium">Menyiapkan kamera...</p>
							</>
						)}
					</div>
				)}
				{submitting && (
					<div
						className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 rounded-xl bg-gray-950/70 text-white backdrop-blur-sm"
						role="status"
						aria-live="polite">
						<Loader2 className="h-10 w-10 animate-spin" />
						<div>
							<p className="text-sm font-semibold">Mengirim data wajah...</p>
							<p className="mt-1 text-xs text-white/75">
								Mohon tunggu dan jangan tutup halaman.
							</p>
						</div>
					</div>
				)}
				{!submitting && cameraStream && !cameraFailed && (
					<button
						type="button"
						onClick={retryCamera}
						aria-label="Muat ulang kamera"
						className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/60">
						<RefreshCw className="h-4 w-4" />
					</button>
				)}
				{/* Liveness status badge – top-right on mobile, bottom-center on desktop */}
				<div
					className={`absolute text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm z-10 ${statusMeta.className}`}
					style={
						isMobile
							? {
									top: "-15px",
									left: "50%",
									transform: "translateX(-50%)",
								}
							: {
									bottom: "0.75rem",
									left: "50%",
									transform: "translateX(-50%)",
								}
					}>
					{statusMeta.label}
				</div>
				{/* Mobile-only capture button – centered at the bottom of the frame */}
				{isMobile && (
					<div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
						<button
							disabled={!faceInFrame || submitting}
							onClick={onCapture}
							className={`flex items-center justify-center w-16 h-16 rounded-full border-4 border-white/80 shadow-lg transition-all active:scale-95 ${
								faceInFrame && !submitting
									? "bg-[#3b5bdb] hover:bg-[#3451c5]"
									: "bg-gray-400 cursor-not-allowed"
							}`}>
							<Camera className="w-7 h-7 text-white" />
						</button>
					</div>
				)}
			</div>

			<FaceTipsModal />
		</>
	);
}

function getLivenessStatusMeta(
	status: FaceLivenessStatus,
	score: number | null,
	stabilityScore: number,
) {
	const scoreText = score === null ? "" : ` (${Math.round(score * 100)}%)`;

	switch (status) {
		case "loading":
			return {
				label: "Memuat...",
				className: "bg-blue-500/90",
			};
		case "no-face":
			return {
				label: "Posisikan wajah di frame",
				className: "bg-red-500/90",
			};
		case "out-of-frame":
			return {
				label: "Wajah belum pas di frame",
				className: "bg-amber-500/90",
			};
		case "verifying":
			return {
				label: `Memverifikasi wajah ${stabilityScore}/${LIVENESS_REQUIRED_FRAMES}`,
				className: "bg-amber-500/90",
			};
		case "real":
			return {
				label: "Posisi wajah sudah pas",
				className: "bg-emerald-500/90",
			};
		case "fake":
			return {
				label: `Wajah tidak lolos verifikasi`,
				className: "bg-red-500/90",
			};
		case "error":
		default:
			return {
				label: "Terjadi kesalahan",
				className: "bg-red-500/90",
			};
	}
}

function getFramePath(frame: FrameCfg, closeMask = false) {
	const { cx, cy, rx, ry } = frame;
	const shoulderY = cy + ry * 0.98;
	const leftShoulderX = cx - rx * frame.shoulderWidth;
	const rightShoulderX = cx + rx * frame.shoulderWidth;

	const visiblePath = [
		`M ${leftShoulderX} ${shoulderY}`,
		`C ${cx - rx * 1.02} ${cy + ry * 0.88}, ${cx - rx * 0.7} ${cy + ry * 0.87}, ${cx - rx * 0.48} ${cy + ry * 0.82}`,
		`C ${cx - rx * 0.37} ${cy + ry * 0.79}, ${cx - rx * 0.36} ${cy + ry * 0.72}, ${cx - rx * 0.36} ${cy + ry * 0.62}`,
		`C ${cx - rx * 0.53} ${cy + ry * 0.52}, ${cx - rx * 0.66} ${cy + ry * 0.38}, ${cx - rx * 0.72} ${cy + ry * 0.2}`,
		`C ${cx - rx * 0.84} ${cy + ry * 0.2}, ${cx - rx * 0.9} ${cy + ry * 0.08}, ${cx - rx * 0.9} ${cy - ry * 0.07}`,
		`C ${cx - rx * 0.9} ${cy - ry * 0.22}, ${cx - rx * 0.84} ${cy - ry * 0.34}, ${cx - rx * 0.73} ${cy - ry * 0.35}`,
		`C ${cx - rx * 0.7} ${cy - ry * 0.72}, ${cx - rx * 0.46} ${cy - ry * 0.98}, ${cx} ${cy - ry * 0.98}`,
		`C ${cx + rx * 0.46} ${cy - ry * 0.98}, ${cx + rx * 0.7} ${cy - ry * 0.72}, ${cx + rx * 0.73} ${cy - ry * 0.35}`,
		`C ${cx + rx * 0.84} ${cy - ry * 0.34}, ${cx + rx * 0.9} ${cy - ry * 0.22}, ${cx + rx * 0.9} ${cy - ry * 0.07}`,
		`C ${cx + rx * 0.9} ${cy + ry * 0.08}, ${cx + rx * 0.84} ${cy + ry * 0.2}, ${cx + rx * 0.72} ${cy + ry * 0.2}`,
		`C ${cx + rx * 0.66} ${cy + ry * 0.38}, ${cx + rx * 0.53} ${cy + ry * 0.52}, ${cx + rx * 0.36} ${cy + ry * 0.62}`,
		`C ${cx + rx * 0.36} ${cy + ry * 0.72}, ${cx + rx * 0.37} ${cy + ry * 0.79}, ${cx + rx * 0.48} ${cy + ry * 0.82}`,
		`C ${cx + rx * 0.7} ${cy + ry * 0.87}, ${cx + rx * 1.02} ${cy + ry * 0.88}, ${rightShoulderX} ${shoulderY}`,
	].join(" ");

	if (!closeMask) return visiblePath;
	return `${visiblePath} L ${rightShoulderX} 760 L ${leftShoulderX} 760 Z`;
}

function FaceTipsModal() {
	const [open, setOpen] = useState(false);
	const shownRef = useRef(false);

	useEffect(() => {
		if (!shownRef.current) {
			setOpen(true);
			shownRef.current = true;
		}
	}, []);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-[#3b5bdb] font-medium text-sm hover:bg-blue-50 transition-colors cursor-pointer">
					<Info className="w-4 h-4" />
					Lihat Tips Pengambilan Foto
				</button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md bg-white">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-[#1e2a4a]">
						<Info className="w-5 h-5 text-[#3b5bdb]" />
						Tips Pengambilan Foto
					</DialogTitle>
				</DialogHeader>
				<p className="text-gray-500 text-sm leading-relaxed">
					Pastikan pencahayaan cukup terang dan wajah Anda terlihat jelas tanpa
					aksesoris (masker, kacamata, topi).
				</p>
				<div className="flex items-center justify-around gap-4 py-4">
					<div className="flex flex-col gap-2 items-center">
						<div className="size-12 bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center rounded-full text-[24px]">
							<RiSurgicalMaskLine />
						</div>
						<p className="text-[12px] text-center text-[#6B7280] uppercase font-medium">
							Tanpa Masker
						</p>
					</div>
					<div className="flex flex-col gap-2 items-center">
						<div className="size-12 bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center rounded-full text-[24px]">
							<RiSunFill />
						</div>
						<p className="text-[12px] text-center text-[#6B7280] uppercase font-medium">
							Cahaya Cukup
						</p>
					</div>
					<div className="flex flex-col gap-2 items-center">
						<div className="size-12 bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center rounded-full text-[24px]">
							<RiEmotionFill />
						</div>
						<p className="text-[12px] text-center text-[#6B7280] uppercase font-medium">
							Wajah Jelas
						</p>
					</div>
				</div>
				<button
					onClick={() => setOpen(false)}
					className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#3b5bdb] text-white font-medium text-sm hover:bg-[#3451c5] transition-colors">
					Mengerti
				</button>
			</DialogContent>
		</Dialog>
	);
}
