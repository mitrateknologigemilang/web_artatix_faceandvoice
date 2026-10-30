"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	AlertCircle,
	Camera,
	CheckCircle2,
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
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import {
	FaceLivenessDetector,
	LIVENESS_REQUIRED_FRAMES,
	type FaceLivenessStatus,
} from "@/lib/face-liveness-detector";
import HeaderSection from "../../components/HeaderSection";
import InfoListCard from "../../components/InfoListCard";
import {
	getApiErrorMessage,
	submitBiometricData,
} from "@/services/verification.service";
import { Modal } from "../../components/Modal";
import { useHandleSubmit } from "@/hooks/use-handle-submit";
import FooterMobileBtn from "../../components/FooterMobileBtn";
import { Button } from "@/components/ui/button";
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
const FACE_DETECTION_INTERVAL_DESKTOP_MS = 350;
const FACE_DETECTION_INTERVAL_MOBILE_MS = 350;
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
	const [isMobile] = useState(true);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [tncAccepted, setTncAccepted] = useState(false);

	const webcamRef = useRef<Webcam>(null);
	const faceBlobRef = useRef<Blob | null>(null);
	const router = useRouter();
	const { faceBlob, ticketCode, nik, clearVerification, setFaceBlob } =
		useVerification();
	const allowed = useVerificationGuard("face");

	const returnToTicket = useCallback(() => {
		webcamRef.current?.stream?.getTracks().forEach((track) => track.stop());
		clearVerification();
		router.push("/verification/ticket");
	}, [clearVerification, router]);

	const resetToFaceCapture = useCallback(() => {
		faceBlobRef.current = null;
		setFaceBlob(null);
		setTncAccepted(false);
		setFaceInFrame(false);
		setState("verifying");
	}, [setFaceBlob]);

	const { handleSubmitWithFaceBlob, handleErrorClose, failureStage } =
		useHandleSubmit({
			faceBlob,
			ticketCode,
			nik,
			errorMsg,
			setErrorMsg,
			setSubmitting,
			submitBiometricData,
			getApiErrorMessage,
			onTicketError: returnToTicket,
			onFaceError: resetToFaceCapture,
		});

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
		<div className="flex flex-col flex-1">
			{/* Segmented Mobile Stepper */}
			<div className="mb-4 flex items-center gap-2">
				<div className="h-1.5 flex-1 rounded-full bg-emerald-500" />
				<div
					className={`h-1.5 flex-1 rounded-full transition-colors ${
						state === "success" ? "bg-emerald-500" : "bg-[#3b5bdb]"
					}`}
				/>
			</div>

			<HeaderSection />

			<Modal
				open={!!errorMsg}
				onClose={handleErrorClose}
				icon={
					<div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600">
						<XCircle className="h-5 w-5" />
					</div>
				}
				title={
					failureStage === "ticket"
						? "Data Tiket Bermasalah"
						: failureStage === "retry"
							? "Gagal Mengirim Data"
							: "Verifikasi Wajah Gagal"
				}
				description={
					<div className="mt-2 space-y-2.5 text-left">
						<div className="rounded-xl border border-red-200/80 bg-red-50/50 px-3.5 py-2.5 text-xs font-medium text-red-900">
							{errorMsg}
						</div>
						<p className="text-[11px] leading-relaxed text-slate-500">
							{failureStage === "ticket"
								? "Terdapat kendala pada kode tiket atau NIK Anda. Silakan kembali ke langkah pertama untuk memeriksa ulang data tiket."
								: failureStage === "retry"
									? "Terjadi gangguan koneksi saat mengirim data. Foto wajah Anda tetap tersimpan dan siap dikirim ulang."
									: "Pastikan pencahayaan cukup terang, wajah menghadap lurus ke kamera, dan tidak tertutup masker atau kacamata."}
						</p>
					</div>
				}>
				<button
					type="button"
					onClick={handleErrorClose}
					className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#3b5bdb] text-sm font-semibold text-white transition-all hover:bg-[#3451c5] active:scale-[0.99]">
					{failureStage === "ticket" ? (
						<>
							<ArrowLeft className="h-4 w-4" />
							Periksa Data Tiket
						</>
					) : failureStage === "retry" ? (
						<>
							<RefreshCw className="h-4 w-4" />
							Coba Lagi
						</>
					) : (
						<>
							<Camera className="h-4 w-4" />
							Ambil Ulang Foto
						</>
					)}
				</button>
			</Modal>

			<div className="mb-4 text-left">
				<p
					className={`text-[11px] font-bold uppercase tracking-wider ${
						state === "success" ? "text-emerald-600" : "text-[#3b5bdb]"
					}`}>
					{state === "success" ? "Konfirmasi Akhir" : "Langkah 2 dari 2"}
				</p>
				<h1 className="mt-0.5 text-xl font-bold tracking-tight text-[#1e2a4a]">
					{state === "success"
						? "Persetujuan Face ID"
						: "Ambil Foto Wajah"}
				</h1>
				<p className="mt-1 text-xs leading-relaxed text-slate-500">
					{state === "success"
						? "Periksa hasil foto wajah Anda dan setujui syarat & ketentuan di bawah."
						: "Posisikan wajah di dalam bingkai tanpa masker atau kacamata."}
				</p>
			</div>

			<div className="flex-1 flex flex-col items-center text-center pb-4">
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

			<FooterMobileBtn
				children={
					<>
						{state === "failed" && (
							<Button
								onClick={() => setState("verifying")}
								className="inline-flex items-center justify-center gap-2 bg-[#3b5bdb] text-white hover:bg-[#3451c5] transition-colors">
								<RefreshCw className="w-4 h-4" />
								Ulangi
							</Button>
						)}
						{state === "verifying" && (
							<>
								<Button
									disabled={submitting}
									onClick={returnToTicket}
									className={`inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors ${
										submitting ? "opacity-60 cursor-not-allowed" : ""
									}`}>
									<ArrowLeft className="w-4 h-4" />
									Kembali
								</Button>
							</>
						)}
						{state === "success" && (
							<>
								<Button
									type="button"
									disabled={submitting}
									onClick={resetToFaceCapture}
									className={`inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 ${
										submitting ? "cursor-not-allowed opacity-60" : ""
									}`}>
									<RefreshCw className="h-4 w-4" />
									Foto Ulang
								</Button>
								<Button
									type="button"
									disabled={submitting || !tncAccepted}
									onClick={confirmSubmit}
									className={`inline-flex items-center justify-center gap-2 bg-[#3b5bdb] text-white transition-colors hover:bg-[#3451c5] ${
										submitting || !tncAccepted
											? "cursor-not-allowed opacity-60"
											: ""
									}`}>
									{submitting ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										<Send className="h-4 w-4" />
									)}
									{submitting ? "Mengirim..." : "Daftarkan"}
								</Button>
							</>
						)}
					</>
				}
			/>
		</div>
	);
}

/* ---------- Sub-components ---------- */

function FailedState() {
	return (
		<div className="w-full flex flex-col text-left">
			<div className="rounded-2xl border border-red-200/80 bg-red-50/50 p-4">
				<div className="flex items-start gap-3">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
						<XCircle className="h-5 w-5" />
					</div>
					<div className="min-w-0">
						<span className="inline-block text-[11px] font-bold uppercase tracking-wider text-red-700">
							Verifikasi Gagal
						</span>
						<h2 className="mt-0.5 text-lg font-bold tracking-tight text-[#1e2a4a]">
							Wajah Tidak Terdeteksi
						</h2>
						<p className="mt-1 text-xs leading-relaxed text-slate-600">
							Sistem belum dapat memverifikasi foto wajah Anda. Periksa kondisi
							berikut sebelum mengambil foto ulang.
						</p>
					</div>
				</div>
			</div>

			<InfoListCard
				className="mt-4"
				title="Panduan Pengambilan Foto"
				items={[
					{
						title: "Pencahayaan Cukup Terang",
						desc: "Pastikan wajah menghadap sumber cahaya dan tidak membelakangi lampu atau jendela.",
					},
					{
						title: "Tanpa Masker atau Kacamata",
						desc: "Lepaskan masker, kacamata hitam, atau topi yang menutupi area wajah.",
					},
					{
						title: "Posisi Wajah Lurus ke Kamera",
						desc: "Arahkan pandangan lurus ke depan tepat di dalam bingkai panduan.",
					},
				]}
			/>
		</div>
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
		<div className="flex w-full flex-col items-center mx-auto space-y-4">
			{/* Captured Face Thumbnail Row Card */}
			{previewUrl ? (
				<Sheet>
					<SheetTrigger asChild>
						<button
							type="button"
							className="flex w-full items-center justify-between gap-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-3 text-left transition-all hover:border-emerald-300 active:scale-[0.99]">
							<div className="flex items-center gap-3 min-w-0">
								<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-900 ring-1 ring-black/10">
									<img
										src={previewUrl}
										alt="Thumbnail Wajah"
										className="h-full w-full object-cover scale-x-[-1]"
									/>
								</div>
								<div className="min-w-0">
									<div className="flex items-center gap-1.5">
										<CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
										<p className="text-xs font-bold text-[#1e2a4a] truncate">
											Foto Wajah Siap Didaftarkan
										</p>
									</div>
									<p className="mt-0.5 text-[11px] text-slate-500 truncate">
										Ketuk untuk memeriksa foto ukuran penuh
									</p>
								</div>
							</div>
							<span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-[#3b5bdb] border border-slate-200/80">
								<Maximize2 className="h-3.5 w-3.5" />
								Lihat
							</span>
						</button>
					</SheetTrigger>
					<SheetContent
						side="bottom"
						showCloseButton={false}
						className="mx-auto h-auto w-full max-w-md rounded-t-3xl border-t-0 bg-white px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl">
						<div className="mx-auto mb-1 h-1.5 w-12 shrink-0 rounded-full bg-slate-200" />
						<SheetHeader className="flex flex-row items-center justify-between p-0">
							<SheetTitle className="text-base font-bold text-[#1e2a4a]">
								Preview Foto Wajah
							</SheetTitle>
							<SheetClose className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none active:scale-95">
								<X className="h-5 w-5" />
								<span className="sr-only">Tutup preview</span>
							</SheetClose>
						</SheetHeader>
						<div className="relative mx-auto w-full overflow-hidden rounded-2xl bg-gray-950 ring-1 ring-black/5">
							<img
								src={previewUrl}
								alt="Preview"
								className="block h-auto max-h-[75vh] w-full object-contain scale-x-[-1]"
							/>
						</div>
					</SheetContent>
				</Sheet>
			) : (
				<div className="flex w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-6 text-xs text-slate-500">
					Preview tidak tersedia.
				</div>
			)}

			{/* Compact Text-only T&C */}
			<div className="w-full text-left">
				<InfoListCard
					title="Dengan melakukan registrasi Face ID, saya menyetujui ketentuan berikut:"
					items={[
						{
							title: "Satu Wajah untuk Satu Tiket",
							desc: "Saya hanya mendaftarkan 1 (satu) wajah untuk 1 (satu) kode tiket/1 (satu) barcode yang dimiliki.",
						},
						{
							title: "Kesesuaian Data Diri Pribadi",
							desc: "Data wajah yang saya daftarkan adalah data diri saya sendiri dan bukan milik orang lain.",
						},
						{
							title: "Metode Verifikasi Akses Masuk",
							desc: "Wajah yang telah didaftarkan akan digunakan sebagai salah satu metode verifikasi saat memasuki area Jomlo Fest.",
						},
						{
							title: "Tidak Dapat Dipindahtangankan",
							desc: "Tiket dengan Face ID yang telah terdaftar tidak dapat digunakan oleh orang lain.",
						},
						{
							title: "Persetujuan Syarat & Ketentuan",
							desc: "Dengan melanjutkan proses pendaftaran Face ID, saya menyetujui seluruh syarat dan ketentuan yang berlaku.",
						},
					]}
				/>
				<label
					htmlFor="tnc"
					className={`mt-3 flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-all ${
						tncAccepted
							? "border-[#3b5bdb] bg-blue-50/50"
							: "border-slate-200 bg-white hover:bg-slate-50"
					}`}>
					<input
						type="checkbox"
						id="tnc"
						className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border border-slate-400 accent-[#3b5bdb] outline-none focus-visible:ring-2 focus-visible:ring-[#3b5bdb]/50"
						checked={tncAccepted}
						onChange={(e) => setTncAccepted(e.target.checked)}
					/>
					<span className="text-xs font-semibold leading-relaxed text-[#1e2a4a]">
						Saya telah membaca dan menyetujui syarat & ketentuan di atas.
					</span>
				</label>
			</div>
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
			<div className="relative w-full mb-3.5 rounded-2xl bg-gray-900 aspect-3/4 shadow-inner ring-1 ring-slate-900/10">
				{/* Webcam + SVG overlay wrapper (clips video to rounded corners) */}
				<div className="absolute inset-0 rounded-2xl overflow-hidden">
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
				{/* Liveness status badge – centered inside top of camera frame */}
				<div
					className={`absolute top-3 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-md z-10 whitespace-nowrap ${statusMeta.className}`}>
					{statusMeta.label}
				</div>
				{/* Mobile-only capture button – centered at the bottom of the frame */}
				{isMobile && (
					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
						<button
							disabled={!faceInFrame || submitting}
							onClick={onCapture}
							className={`flex items-center justify-center w-16 h-16 rounded-full border-4 border-white/90 shadow-xl ring-4 ring-black/20 transition-all active:scale-90 ${
								faceInFrame && !submitting
									? "bg-[#3b5bdb] hover:bg-[#3451c5]"
									: "bg-slate-400/80 cursor-not-allowed"
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
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<button className="w-full inline-flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/80 text-[#3b5bdb] font-semibold text-xs hover:bg-blue-50/60 transition-colors cursor-pointer">
					<span className="inline-flex items-center gap-2">
						<Info className="w-4 h-4 shrink-0" />
						Lihat Tips Pengambilan Foto
					</span>
					<span className="text-[11px] text-slate-400 font-medium">Buka</span>
				</button>
			</SheetTrigger>
			<SheetContent
				side="bottom"
				className="mx-auto w-full max-w-md rounded-t-3xl border-t-0 bg-white px-5 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl">
				<div className="mx-auto mb-1 h-1.5 w-12 shrink-0 rounded-full bg-slate-200" />
				<SheetHeader className="p-0 text-left">
					<SheetTitle className="flex items-center gap-2 text-base font-bold text-[#1e2a4a]">
						<Info className="w-5 h-5 text-[#3b5bdb]" />
						Tips Pengambilan Foto
					</SheetTitle>
				</SheetHeader>
				<p className="text-slate-500 text-xs leading-relaxed">
					Pastikan pencahayaan cukup terang dan wajah Anda terlihat jelas tanpa
					aksesoris (masker, kacamata, topi).
				</p>
				<div className="grid grid-cols-3 gap-2.5 py-2">
					<div className="flex flex-col gap-2 items-center rounded-2xl bg-slate-50 p-3 border border-slate-100">
						<div className="size-11 bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center rounded-xl text-[22px]">
							<RiSurgicalMaskLine />
						</div>
						<p className="text-[11px] text-center text-slate-600 font-semibold">
							Tanpa Masker
						</p>
					</div>
					<div className="flex flex-col gap-2 items-center rounded-2xl bg-slate-50 p-3 border border-slate-100">
						<div className="size-11 bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center rounded-xl text-[22px]">
							<RiSunFill />
						</div>
						<p className="text-[11px] text-center text-slate-600 font-semibold">
							Cahaya Cukup
						</p>
					</div>
					<div className="flex flex-col gap-2 items-center rounded-2xl bg-slate-50 p-3 border border-slate-100">
						<div className="size-11 bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center rounded-xl text-[22px]">
							<RiEmotionFill />
						</div>
						<p className="text-[11px] text-center text-slate-600 font-semibold">
							Wajah Jelas
						</p>
					</div>
				</div>
				<button
					onClick={() => setOpen(false)}
					className="mt-1 w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-[#3b5bdb] text-white font-semibold text-sm hover:bg-[#3451c5] active:scale-[0.99] transition-all">
					Mengerti
				</button>
			</SheetContent>
		</Sheet>
	);
}
