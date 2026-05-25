"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	AlertCircle,
	CheckCircle2,
	Shield,
	RefreshCw,
	ArrowRight,
	ArrowLeft,
	CalendarDays,
	MapPin,
	AudioLines,
	Lock,
	Info,
	Play,
	Pause,
	Loader2,
	X,
} from "lucide-react";
import { useVerification } from "../../VerificationContext";
import { submitBiometricData } from "@/services/verification.service";
import { convertToWav } from "@/lib/audioConverter";
import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

type RecordingState = "idle" | "recording" | "success" | "failed";
type RecordingMethod = "read" | "sing";

const MAX_RECORDING_SECONDS = 180; // 3 minutes

export default function SoundVerificationPage() {
	const [state, setState] = useState<RecordingState>("idle");
	const [method, setMethod] = useState<RecordingMethod>("read");
	const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
	const [recordingTime, setRecordingTime] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const { faceBlob, kodeTiket } = useVerification();

	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const chunksRef = useRef<Blob[]>([]);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const router = useRouter();

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
			streamRef.current?.getTracks().forEach((t) => t.stop());
		};
	}, []);

	// Auto-stop at max duration
	useEffect(() => {
		if (state === "recording" && recordingTime >= MAX_RECORDING_SECONDS) {
			handleStop();
		}
	}, [recordingTime, state]);

	const handleStart = useCallback(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					noiseSuppression: true,
					echoCancellation: true,
				},
			});
			streamRef.current = stream;
			chunksRef.current = [];

			const recorder = new MediaRecorder(stream);
			mediaRecorderRef.current = recorder;

			recorder.ondataavailable = (e) => {
				if (e.data.size > 0) chunksRef.current.push(e.data);
			};

			recorder.onstop = () => {
				const blob = new Blob(chunksRef.current, { type: "audio/webm" });
				setAudioBlob(blob);
				setState("success");
				stream.getTracks().forEach((t) => t.stop());
			};

			recorder.start(100); // collect data every 100ms
			setState("recording");
			setRecordingTime(0);

			// Timer
			timerRef.current = setInterval(() => {
				setRecordingTime((prev) => prev + 1);
			}, 1000);
		} catch {
			setState("failed");
		}
	}, []);

	const handleStop = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state !== "inactive"
		) {
			mediaRecorderRef.current.stop();
		}
	}, []);

	const handleStartStop = useCallback(() => {
		if (state === "idle") handleStart();
		else if (state === "recording") handleStop();
	}, [state, handleStart, handleStop]);

	const handleRetry = useCallback(() => {
		setAudioBlob(null);
		setRecordingTime(0);
		setState("idle");
	}, []);

	const handleSubmit = useCallback(async () => {
		if (!audioBlob || !faceBlob) {
			alert("Data wajah atau suara belum tersedia.");
			return;
		}
		if (!kodeTiket) {
			alert("Kode tiket belum tersedia. Silakan kembali ke langkah 1.");
			router.push("/verification/ticket");
			return;
		}
		setSubmitting(true);
		try {
			const wavBlob = await convertToWav(audioBlob);

			await submitBiometricData({
				kode_tiket: kodeTiket,
				file_wajah: faceBlob,
				file_suara: wavBlob,
			});
			alert("Data biometrik berhasil dikirim!");
		} catch (error) {
			console.error("Submit error:", error);
			alert("Gagal mengirim data. Silakan coba lagi.");
		} finally {
			setSubmitting(false);
		}
	}, [audioBlob, faceBlob, kodeTiket, router]);

	const formatTime = (seconds: number) => {
		const m = Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0");
		const s = (seconds % 60).toString().padStart(2, "0");
		return `${m}:${s}`;
	};

	return (
		<div className="space-y-6">
			{/* Event Info */}
			<div className="text-center space-y-2 w-full max-w-full overflow-hidden px-2 sm:px-0">
				<h1 className="text-xl sm:text-2xl font-bold text-[#1e2a4a] truncate">
					Jomlo Festival 2026 Chapter Bekasi
				</h1>
			</div>

			{/* Main Card */}
			<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
				{/* Card Header */}
				<div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 gap-2">
					<div className="flex items-center gap-2 min-w-0">
						<AudioLines className="w-5 h-5 text-[#3b5bdb] shrink-0" />
						<span className="font-semibold text-[#1e2a4a] truncate">
							Verifikasi Suara
						</span>
					</div>
					<span
						className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${
							state === "success"
								? "text-emerald-600 bg-emerald-50 border-emerald-200"
								: "text-[#3b5bdb] bg-blue-50 border-blue-200"
						}`}>
						{state === "success" ? "Selesai" : "Langkah 3 dari 3"}
					</span>
				</div>

				{/* Card Body */}
				<div className="px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center text-center">
					{(state === "idle" || state === "recording") && (
						<IdleRecordingState
							method={method}
							setMethod={setMethod}
							isRecording={state === "recording"}
							recordingTime={recordingTime}
							formatTime={formatTime}
							stream={streamRef.current}
						/>
					)}
					{state === "success" && (
						<SuccessState
							audioBlob={audioBlob}
							recordDuration={recordingTime}
						/>
					)}
					{state === "failed" && <FailedState />}
				</div>

				{/* Card Footer */}
				<div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 flex items-center justify-between">
					{(state === "idle" || state === "recording") && (
						<>
							<button
								onClick={() => router.push("/verification/face")}
								className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
								<ArrowLeft className="w-4 h-4" />
								Kembali
							</button>
							<button
								onClick={handleStartStop}
								className={`inline-flex ml-auto items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm cursor-pointer transition-colors ${
									state === "recording"
										? "bg-red-500 text-white hover:bg-red-600"
										: "bg-[#3b5bdb] text-white hover:bg-[#3451c5]"
								}`}>
								<span
									className={`w-2 h-2 rounded-full ${
										state === "recording"
											? "bg-white animate-pulse"
											: "bg-white"
									}`}
								/>
								{state === "idle" ? "Mulai Rekam" : "Berhenti"}
							</button>
						</>
					)}
					{state === "failed" && (
						<div className="flex w-full justify-end">
							<button
								onClick={handleRetry}
								className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#3b5bdb] text-white font-medium text-sm hover:bg-[#3451c5] transition-colors">
								<RefreshCw className="w-4 h-4" />
								Ulangi
							</button>
						</div>
					)}
					{state === "success" && (
						<div className="flex w-full justify-between">
							<button
								onClick={handleRetry}
								className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
								<ArrowLeft className="w-4 h-4" />
								Kembali
							</button>
							<button
								onClick={handleSubmit}
								disabled={submitting}
								className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#3b5bdb] text-white font-medium text-sm hover:bg-[#3451c5] transition-colors ${submitting ? "opacity-70 cursor-not-allowed" : ""}`}>
								{submitting ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<ArrowRight className="w-4 h-4" />
								)}
								{submitting ? "Mengirim..." : "Lanjutkan"}
							</button>
						</div>
					)}
				</div>
			</div>

			<TipsModal autoOpen={state === "idle"} />

			{state === "failed" && (
				<SecurityBanner
					title="Data Biometrik Anda Aman"
					description="Data suara Anda dienkripsi dan hanya digunakan untuk verifikasi."
				/>
			)}

			{state === "success" && (
				<SecurityBanner
					title="Data Biometrik Anda Aman"
					description="Data wajah Anda dienkripsi dan hanya digunakan untuk proses verifikasi masuk pada hari acara. Data tidak akan dibagikan kepada pihak ketiga."
				/>
			)}
		</div>
	);
}

/* ---------- Sub-components ---------- */

function IdleRecordingState({
	method,
	setMethod,
	isRecording,
	recordingTime,
	formatTime,
	stream,
}: {
	method: RecordingMethod;
	setMethod: (m: RecordingMethod) => void;
	isRecording: boolean;
	recordingTime: number;
	formatTime: (s: number) => string;
	stream: MediaStream | null;
}) {
	return (
		<>
			<h2 className="text-xl font-bold text-[#1e2a4a] mb-4">
				Rekam Sampel Suara Anda
			</h2>

			{/* Method Tabs */}
			<div className="inline-flex bg-gray-100 rounded-lg p-1 mb-4">
				<button
					onClick={() => !isRecording && setMethod("read")}
					disabled={isRecording}
					className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
						method === "read"
							? "bg-white text-[#3b5bdb] shadow-sm"
							: "text-gray-500 hover:text-gray-700"
					} ${isRecording ? "opacity-50 cursor-not-allowed" : ""}`}>
					Baca Kalimat
				</button>
				<button
					onClick={() => !isRecording && setMethod("sing")}
					disabled={isRecording}
					className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
						method === "sing"
							? "bg-white text-[#3b5bdb] shadow-sm"
							: "text-gray-500 hover:text-gray-700"
					} ${isRecording ? "opacity-50 cursor-not-allowed" : ""}`}>
					Nyanyi Bebas
				</button>
			</div>

			<p className="text-gray-500 text-sm mb-5">
				Silakan pilih metode perekaman di atas, tekan tombol rekam, dan ikuti
				instruksi.
			</p>

			{/* Sentence Box */}
			{method === "read" && (
				<div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 mb-6">
					<p className="text-gray-600 italic text-lg leading-relaxed">
						&ldquo;Saya mengonfirmasi identitas saya untuk acara Jomlo Festival
						2026 Chapter Bekasi ini&rdquo;
					</p>
				</div>
			)}

			{method === "sing" && (
				<div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 mb-6">
					<p className="text-gray-600 italic text-lg leading-relaxed">
						Nyanyikan lagu apapun yang Anda suka
					</p>
				</div>
			)}

			{/* Live Waveform */}
			<LiveWaveform isRecording={isRecording} stream={stream} />

			{/* Timer */}
			<div className="inline-flex items-center gap-1 border border-gray-200 rounded-lg px-4 py-2 mb-2">
				<span
					className={`text-lg font-mono font-bold ${
						isRecording ? "text-red-500" : "text-[#3b5bdb]"
					}`}>
					{formatTime(recordingTime)}
				</span>
				<span className="text-lg font-mono text-gray-400">
					/ {formatTime(MAX_RECORDING_SECONDS)}
				</span>
			</div>

			{isRecording && (
				<p className="text-xs text-red-500 mt-1 animate-pulse">● Merekam...</p>
			)}

			{/* Encryption Note */}
			<div className="flex items-center gap-1.5 mt-4 text-xs text-gray-400">
				<Lock className="w-3.5 h-3.5" />
				Data suara Anda dienkripsi dan hanya digunakan untuk verifikasi.
			</div>
		</>
	);
}

/**
 * Live waveform visualization using AnalyserNode from the recording stream.
 */
function LiveWaveform({
	isRecording,
	stream,
}: {
	isRecording: boolean;
	stream: MediaStream | null;
}) {
	const [bars, setBars] = useState<number[]>(Array(30).fill(8));

	useEffect(() => {
		if (!isRecording || !stream) {
			setBars(Array(30).fill(8));
			return;
		}

		const audioCtx = new AudioContext();
		const source = audioCtx.createMediaStreamSource(stream);
		const analyser = audioCtx.createAnalyser();
		analyser.fftSize = 64;
		analyser.smoothingTimeConstant = 0.85; // makes it smoother over time
		source.connect(analyser);

		const dataArray = new Uint8Array(analyser.frequencyBinCount);
		let animId: number;

		function draw() {
			analyser.getByteFrequencyData(dataArray);

			// We only need 15 bars because we will mirror them to get 30 symmetrical bars
			const numBars = 15;
			const halfBars: number[] = [];

			// Bins 0-14 cover the lower (voice) frequencies perfectly
			for (let i = 0; i < numBars; i++) {
				const val = dataArray[i] || 0;
				// Boost the values slightly to make it more consistently visible
				const height = Math.max(8, (val / 255) * 120);
				halfBars.push(Math.min(100, height)); // cap at 100%
			}

			// Spatial smoothing (average with neighbors) for less jaggedness
			const smoothedHalf = halfBars.map((val, i, arr) => {
				if (i === 0) return (val * 2 + arr[1]) / 3;
				if (i === arr.length - 1) return (val * 2 + arr[i - 1]) / 3;
				return (arr[i - 1] + val * 2 + arr[i + 1]) / 4;
			});

			// Mirror to create a symmetrical/uniform "diamond" shape
			// Lowest index (loudest freq) ends up in the middle
			const reversed = [...smoothedHalf].reverse();
			const newBars = [...reversed, ...smoothedHalf];

			setBars(newBars);
			animId = requestAnimationFrame(draw);
		}

		draw();

		return () => {
			cancelAnimationFrame(animId);
			source.disconnect();
			audioCtx.close();
		};
	}, [isRecording, stream]);

	return (
		<div className="w-full max-w-md flex items-center justify-center gap-[3px] h-12 mb-4">
			{bars.map((height, i) => (
				<div
					key={i}
					className={`w-1 rounded-full transition-all duration-75 ${
						isRecording ? "bg-[#3b5bdb]" : "bg-blue-200"
					}`}
					style={{ height: `${height}%` }}
				/>
			))}
		</div>
	);
}

function CustomAudioPlayer({
	audioUrl,
	recordDuration,
}: {
	audioUrl: string;
	recordDuration: number;
}) {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const reqRef = useRef<number | null>(null);

	const togglePlayPause = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const updateProgress = useCallback(() => {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime);
		}
		reqRef.current = requestAnimationFrame(updateProgress);
	}, []);

	useEffect(() => {
		if (isPlaying) {
			reqRef.current = requestAnimationFrame(updateProgress);
		} else if (reqRef.current) {
			cancelAnimationFrame(reqRef.current);
		}
		return () => {
			if (reqRef.current) cancelAnimationFrame(reqRef.current);
		};
	}, [isPlaying, updateProgress]);

	const handleTimeUpdate = () => {
		// Fallback for when not playing (e.g., initial load or seeking)
		if (!isPlaying && audioRef.current) {
			setCurrentTime(audioRef.current.currentTime);
		}
	};

	const handleEnded = () => {
		setIsPlaying(false);
		setCurrentTime(0);
		if (audioRef.current) {
			audioRef.current.currentTime = 0;
		}
	};

	const formatTime = (seconds: number) => {
		const m = Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0");
		const s = Math.floor(seconds % 60)
			.toString()
			.padStart(2, "0");
		return `${m}:${s}`;
	};

	const progress =
		recordDuration > 0
			? Math.min((currentTime / recordDuration) * 100, 100)
			: 0;

	return (
		<div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4">
			<audio
				ref={audioRef}
				src={audioUrl}
				onTimeUpdate={handleTimeUpdate}
				onEnded={handleEnded}
			/>
			<button
				onClick={togglePlayPause}
				className="w-10 h-10 rounded-full bg-[#3b5bdb] text-white flex items-center justify-center shrink-0 hover:bg-[#3451c5] transition-colors shadow-sm">
				{isPlaying ? (
					<Pause className="w-5 h-5 fill-current" />
				) : (
					<Play className="w-5 h-5 fill-current ml-1" />
				)}
			</button>
			<div className="flex-1 w-full flex flex-col pt-1">
				<div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-1.5 relative">
					<div
						className="absolute top-0 left-0 h-full bg-[#3b5bdb]"
						style={{ width: `${progress}%` }}
					/>
				</div>
				<div className="flex justify-between text-[11px] font-medium text-gray-500 font-mono">
					<span>{formatTime(currentTime)}</span>
					<span>{formatTime(recordDuration)}</span>
				</div>
			</div>
		</div>
	);
}

function SuccessState({
	audioBlob,
	recordDuration,
}: {
	audioBlob: Blob | null;
	recordDuration: number;
}) {
	const [audioUrl, setAudioUrl] = useState<string | null>(null);

	useEffect(() => {
		if (!audioBlob) return;
		const url = URL.createObjectURL(audioBlob);
		setAudioUrl(url);
		return () => URL.revokeObjectURL(url);
	}, [audioBlob]);

	return (
		<>
			{/* Success Icon */}
			<div className="relative mb-6">
				<div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center relative">
					<div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
						<CheckCircle2 className="w-10 h-10 text-emerald-500" />
					</div>
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
				Pendaftaran Suara Berhasil!
			</h2>
			<p className="text-gray-500 text-sm max-w-md mb-6">
				Sampel suara Anda telah berhasil direkam dan diverifikasi secara aman.
				Identitas Anda kini terhubung untuk akses acara.
			</p>

			{/* Audio Preview */}
			{audioUrl && (
				<div className="w-full max-w-md mb-6">
					<CustomAudioPlayer
						audioUrl={audioUrl}
						recordDuration={recordDuration}
					/>
				</div>
			)}

			{/* Verified Badge */}
			<div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600">
				<CheckCircle2 className="w-4 h-4 text-emerald-500" />
				Suara terverifikasi aman
			</div>
		</>
	);
}

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
				Gagal Merekam Suara
			</h2>
			<p className="text-gray-500 text-sm max-w-md mb-1">
				Maaf, kami tidak dapat memverifikasi suara Anda.
			</p>
			<p className="text-red-500 text-sm mb-6">
				Suara latar terlalu bising atau kualitas audio rendah.
			</p>

			{/* Tips */}
			<div className="bg-red-50 border border-red-100 rounded-xl px-6 py-5 w-full max-w-md text-left">
				<p className="font-semibold text-sm text-gray-700 mb-3 flex items-center gap-2">
					<span className="text-red-500">💡</span>
					Tips untuk memperbaikinya:
				</p>
				<ul className="space-y-2 text-sm text-red-600">
					<li className="flex items-start gap-2">
						<span>•</span>
						Pindah ke ruangan yang lebih tenang dan sunyi
					</li>
					<li className="flex items-start gap-2">
						<span>•</span>
						Bicara lebih dekat dengan mikrofon perangkat
					</li>
					<li className="flex items-start gap-2">
						<span>•</span>
						Ucapkan kalimat dengan volume normal dan jelas
					</li>
				</ul>
			</div>

			{/* Encryption Note */}
			<div className="flex items-center gap-1.5 mt-6 text-xs text-gray-400">
				<Lock className="w-3.5 h-3.5" />
				Data suara Anda dienkripsi dan hanya digunakan untuk verifikasi.
			</div>
		</>
	);
}

function TipsModal({ autoOpen }: { autoOpen: boolean }) {
	const [open, setOpen] = useState(false);
	const shownRef = useRef(false);

	useEffect(() => {
		if (autoOpen && !shownRef.current) {
			setOpen(true);
			shownRef.current = true;
		}
	}, [autoOpen]);

	const tips = [
		"Pastikan Anda berada di ruangan yang tenang",
		"Dekatkan mulut ke mikrofon perangkat",
		"Bicara dengan volume normal dan jelas",
	];

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 px-4 sm:px-6 py-4 text-left hover:border-[#3b5bdb]/30 transition-colors cursor-pointer">
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<Info className="w-5 h-5 text-[#3b5bdb] shrink-0" />
							<span className="font-semibold text-[#1e2a4a] text-sm">
								Lihat Tips Perekaman
							</span>
						</div>
						<ArrowRight className="w-4 h-4 text-gray-400" />
					</div>
				</button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md bg-white">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-[#1e2a4a]">
						<Info className="w-5 h-5 text-[#3b5bdb]" />
						Tips Perekaman
					</DialogTitle>
				</DialogHeader>
				<ul className="space-y-3 mt-2">
					{tips.map((tip, i) => (
						<li
							key={i}
							className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
							<span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-[#3b5bdb] text-xs font-bold shrink-0">
								{i + 1}
							</span>
							{tip}
						</li>
					))}
				</ul>
				<button
					onClick={() => setOpen(false)}
					className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#3b5bdb] text-white font-medium text-sm hover:bg-[#3451c5] transition-colors">
					Mengerti
				</button>
			</DialogContent>
		</Dialog>
	);
}

function SecurityBanner({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 sm:px-6 py-4 sm:py-5">
			<div className="flex items-start gap-2">
				<div className="mt-0.5">
					<Shield className="w-5 h-5 text-[#3b5bdb]" />
				</div>
				<div>
					<h3 className="font-semibold text-[#1e2a4a] text-sm">{title}</h3>
					<p className="text-sm text-gray-500 mt-1 leading-relaxed">
						{description}
					</p>
				</div>
			</div>
		</div>
	);
}
