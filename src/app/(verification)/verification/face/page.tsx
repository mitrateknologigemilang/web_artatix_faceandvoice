"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	AlertCircle,
	CheckCircle2,
	Camera,
	Shield,
	RefreshCw,
	ArrowRight,
	ArrowLeft,
	CalendarDays,
	MapPin,
	ScanFace,
	XCircle,
} from "lucide-react";
import { RiEmotionFill, RiSunFill, RiSurgicalMaskLine } from "@remixicon/react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useRouter } from "next/navigation";
import { useVerification } from "../../VerificationContext";

type VerificationState = "verifying" | "success" | "failed";

const videoConstraints = {
	width: { ideal: 1920 },
	height: { ideal: 1080 },
	facingMode: "user",
};

// Oval frame constants (matching SVG viewBox 1280x720)
const OVAL_CX = 640;
const OVAL_CY = 330;
const OVAL_RX = 200;
const OVAL_RY = 260;

/** Helper: base64 data-url → Blob */
function dataURLtoBlob(dataURL: string): Blob {
	const arr = dataURL.split(",");
	const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
	const bstr = atob(arr[1]);
	const u8 = new Uint8Array(bstr.length);
	for (let i = 0; i < bstr.length; i++) u8[i] = bstr.charCodeAt(i);
	return new Blob([u8], { type: mime });
}

export default function FaceVerificationPage() {
	const [state, setState] = useState<VerificationState>("verifying");
	const webcamRef = useRef<Webcam>(null);
	const faceBlobRef = useRef<Blob | null>(null);
	const router = useRouter();
	const { setFaceBlob } = useVerification();

	const capture = useCallback(() => {
		if (!webcamRef.current) return;
		const video = webcamRef.current.video as HTMLVideoElement | undefined;
		const w = video?.videoWidth || 1920;
		const h = video?.videoHeight || 1080;
		const imgSrc = webcamRef.current.getScreenshot({ width: w, height: h });
		if (imgSrc) {
			faceBlobRef.current = dataURLtoBlob(imgSrc);
			setState("success");
		}
	}, [webcamRef]);

	const handleContinue = useCallback(() => {
		if (faceBlobRef.current) {
			setFaceBlob(faceBlobRef.current);
			router.push("/verification/sound");
		}
	}, [setFaceBlob, router]);

	return (
		<div className="space-y-6">
			{/* Event Info */}
			<div className="text-center space-y-2 w-full max-w-full overflow-hidden px-2 sm:px-0">
				<h1 className="text-xl sm:text-2xl font-bold text-[#1e2a4a] truncate">
					Vigorphoria
				</h1>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-sm text-gray-500 w-full min-w-0">
					<div className="flex items-center justify-center gap-1.5 shrink-0 max-w-full">
						<CalendarDays className="w-4 h-4 shrink-0" />
						<span className="truncate">28 Maret 2026 • 15:00 – 23:00</span>
					</div>
					<div className="flex items-center justify-center gap-1.5 min-w-0 max-w-full">
						<MapPin className="w-4 h-4 shrink-0" />
						<span className="truncate">
							Lubuk Linggau, Kota Lubuk Linggau, Sumatera Selatan
						</span>
					</div>
				</div>
			</div>

			{/* Main Card */}
			<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
				{/* Card Header */}
				<div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 gap-2">
					<div className="flex items-center gap-2 min-w-0">
						<ScanFace className="w-5 h-5 text-[#3b5bdb] shrink-0" />
						<span className="font-semibold text-[#1e2a4a] truncate">
							Pendaftaran Biometrik Wajah
						</span>
					</div>
					<span
						className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${
							state === "success"
								? "text-emerald-600 bg-emerald-50 border-emerald-200"
								: "text-[#3b5bdb] bg-blue-50 border-blue-200"
						}`}>
						{state === "success"
							? "Selesai"
							: state === "failed"
								? "Langkah 1 dari 2"
								: "Langkah 1 dari 2"}
					</span>
				</div>

				{/* Card Body */}
				<div className="px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center text-center">
					{state === "failed" && <FailedState />}
					{state === "success" && <SuccessState />}
					{state === "verifying" && <VerifyingState webcamRef={webcamRef} />}
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
						<button
							onClick={capture}
							className="ml-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#3b5bdb] text-white font-medium text-sm hover:bg-[#3451c5] transition-colors">
							<Camera className="w-4 h-4" />
							Ambil Foto
						</button>
					)}
					{state === "success" && (
						<div className="flex w-full justify-between">
							<button
								onClick={() => {
									faceBlobRef.current = null;
									setState("verifying");
								}}
								className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
								<ArrowLeft className="w-4 h-4" />
								Kembali
							</button>
							<button
								onClick={handleContinue}
								className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#3b5bdb] text-white font-medium text-sm hover:bg-[#3451c5] transition-colors">
								<ArrowRight className="w-4 h-4" />
								Lanjutkan
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Security Banner */}
			<div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 sm:px-6 py-4 sm:py-5">
				<div className="flex items-start gap-3">
					<div className="mt-0.5">
						<Shield className="w-5 h-5 text-[#3b5bdb]" />
					</div>
					<div>
						<h3 className="font-semibold text-[#1e2a4a] text-sm">
							Data Biometrik Anda Aman
						</h3>
						<p className="text-sm text-gray-500 mt-1 leading-relaxed">
							Data wajah Anda dienkripsi dan hanya digunakan untuk proses
							verifikasi masuk pada hari acara. Data tidak akan dibagikan kepada
							pihak ketiga.
						</p>
					</div>
				</div>
			</div>
		</div>
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

function SuccessState() {
	return (
		<>
			{/* Success Icon */}
			<div className="relative mb-6">
				<div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center relative">
					<div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
						<CheckCircle2 className="w-10 h-10 text-emerald-500" />
					</div>
					{/* Sparkles */}
					<svg
						className="absolute -top-1 -right-1 w-5 h-5 text-emerald-400"
						viewBox="0 0 24 24"
						fill="currentColor">
						<path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
					</svg>
					<svg
						className="absolute bottom-0 -left-2 w-4 h-4 text-emerald-300"
						viewBox="0 0 24 24"
						fill="currentColor">
						<path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
					</svg>
				</div>
			</div>

			<h2 className="text-xl font-bold text-[#1e2a4a] mb-2">
				Verifikasi Berhasil!
			</h2>
			<p className="text-gray-500 text-sm max-w-md mb-6">
				Data biometrik Anda telah berhasil didaftarkan. Anda sekarang dapat
				melanjutkan ke tahap berikutnya untuk menyelesaikan pemesanan tiket
				Anda.
			</p>

			{/* Verified Badge */}
			<div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600">
				<CheckCircle2 className="w-4 h-4 text-emerald-500" />
				Wajah terverifikasi aman
			</div>
		</>
	);
}

function VerifyingState({
	webcamRef,
}: {
	webcamRef: React.RefObject<Webcam | null>;
}) {
	const [faceInFrame, setFaceInFrame] = useState(false);

	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		let mounted = true;

		async function loadAndDetect() {
			await faceapi.nets.tinyFaceDetector.loadFromUri("/models");

			if (!mounted) return;

			intervalId = setInterval(async () => {
				const video = webcamRef.current?.video as HTMLVideoElement | undefined;
				if (!video || video.readyState !== 4) return;

				const faceDetections = await faceapi.detectAllFaces(
					video,
					new faceapi.TinyFaceDetectorOptions({
						inputSize: 416,
						scoreThreshold: 0.5,
					}),
				);

				if (!mounted) return;

				if (faceDetections.length > 0) {
					const face = faceDetections.reduce((prev, curr) =>
						curr.box.area > prev.box.area ? curr : prev,
					);

					const { x, y, width, height } = face.box;
					const vw = video.videoWidth;
					const vh = video.videoHeight;

					const scaleX = 1280 / vw;
					const scaleY = 720 / vh;

					// Face center (scaled to SVG viewBox)
					const faceCenterX = (x + width / 2) * scaleX;
					const faceCenterY = (y + height / 2) * scaleY;

					// Check if face center is inside the oval
					const dxCenter = (faceCenterX - OVAL_CX) / OVAL_RX;
					const dyCenter = (faceCenterY - OVAL_CY) / OVAL_RY;
					const isCenterInOval = dxCenter * dxCenter + dyCenter * dyCenter <= 1;

					// Face size checks
					const faceWidth = width * scaleX;
					const minFaceWidth = 1280 * 0.15;
					const isLargeEnough = faceWidth >= minFaceWidth;

					const maxFaceWidth = OVAL_RX * 2 * 1.8;
					const isNotTooLarge = faceWidth <= maxFaceWidth;

					setFaceInFrame(isCenterInOval && isLargeEnough && isNotTooLarge);
				} else {
					setFaceInFrame(false);
				}
			}, 500);
		}

		loadAndDetect();

		return () => {
			mounted = false;
			if (intervalId) clearInterval(intervalId);
		};
	}, [webcamRef]);

	const { permissionGrantedTime } = useVerification();
	const borderColor = faceInFrame ? "#16A34A" : "#DC2626";

	return (
		<>
			{/* Camera Preview with Face Frame */}
			<div className="relative w-full max-w-lg mb-8 rounded-xl overflow-hidden bg-gray-900">
				<Webcam
					key={permissionGrantedTime || "webcam-default"}
					className="w-full h-auto block rounded-xl"
					audio={false}
					height={720}
					ref={webcamRef}
					screenshotFormat="image/jpeg"
					screenshotQuality={1}
					width={1280}
					mirrored
					videoConstraints={videoConstraints}
				/>
				{/* Face frame overlay */}
				<svg
					className="absolute inset-0 w-full h-full pointer-events-none"
					viewBox="0 0 1280 720"
					preserveAspectRatio="xMidYMid slice">
					<defs>
						<mask id="face-cutout">
							<rect width="1280" height="720" fill="white" />
							<ellipse
								cx={OVAL_CX}
								cy={OVAL_CY}
								rx={OVAL_RX}
								ry={OVAL_RY}
								fill="black"
							/>
						</mask>
					</defs>
					{/* Dark overlay with oval cutout */}
					<rect
						width="1280"
						height="720"
						fill="rgba(0,0,0,0.5)"
						mask="url(#face-cutout)"
					/>
					{/* Oval border — turns green when face is in frame */}
					<ellipse
						cx={OVAL_CX}
						cy={OVAL_CY}
						rx={OVAL_RX}
						ry={OVAL_RY}
						fill="none"
						stroke={borderColor}
						strokeWidth="3"
						style={{ transition: "stroke 0.3s ease" }}
					/>
				</svg>
				{/* Status indicator */}
				{faceInFrame && (
					<div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-emerald-500/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
						✓ Wajah terdeteksi
					</div>
				)}
			</div>

			<h1 className="text-xl font-bold text-[#1e2a4a] mb-2">
				Posisikan wajah Anda di dalam bingkai
			</h1>
			<p className="text-gray-500 text-sm max-w-md mb-6">
				Pastikan pencahayaan cukup terang dan wajah Anda terlihat jelas tanpa
				aksesoris (masker, kacamata, topi).
			</p>

			<div className="flex items-center gap-4 sm:gap-8">
				<div className="flex flex-col gap-2 items-center">
					<div className="size-12 bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center rounded-full text-[24px]">
						<RiSurgicalMaskLine />
					</div>
					<p className="text-[12px] text-[#6B7280] uppercase font-medium">
						Tanpa Masker
					</p>
				</div>
				<div className="flex flex-col gap-2 items-center">
					<div className="size-12 bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center rounded-full text-[24px]">
						<RiSunFill />
					</div>
					<p className="text-[12px] text-[#6B7280] uppercase font-medium">
						Cahaya Cukup
					</p>
				</div>
				<div className="flex flex-col gap-2 items-center">
					<div className="size-12 bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center rounded-full text-[24px]">
						<RiEmotionFill />
					</div>
					<p className="text-[12px] text-[#6B7280] uppercase font-medium">
						Wajah Jelas
					</p>
				</div>
			</div>
		</>
	);
}
