"use client";

import React, { useCallback, useRef, useState } from "react";
import {
	ArrowRight,
	CheckCircle2,
	FileText,
	Loader2,
	ScanLine,
	Shield,
	Upload,
	XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
	useVerification,
	useVerificationGuard,
} from "../../VerificationContext";
import {
	getApiErrorMessage,
	getTicketDetail,
	type TicketDetail,
} from "@/services/verification.service";
import { TransitionLoading } from "../../components/TransitionLoading";
import HeaderSection from "../../components/HeaderSection";
import FooterMobileBtn from "../../components/FooterMobileBtn";
import { Button } from "@/components/ui/button";

type ScanState = "idle" | "scanning" | "validating" | "success" | "failed";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const NIK_LENGTH = 16;

function normalizeNik(value: string) {
	return value.replace(/\D/g, "").slice(0, NIK_LENGTH);
}

function isValidNik(value: string) {
	return /^\d{16}$/.test(value);
}

export default function TicketVerificationPage() {
	const [state, setState] = useState<ScanState>("idle");
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [fileName, setFileName] = useState<string>("");
	const [uploadMode, setUploadMode] = useState(false);
	const [manualCode, setManualCode] = useState("");
	const [nikInput, setNikInput] = useState("");
	const [isNavigating, setIsNavigating] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const {
		ticketCode,
		setTicketCode,
		setNik,
		ticketDetail,
		setTicketDetail,
		setFaceBlob,
		setStep,
	} = useVerification();
	const allowed = useVerificationGuard("ticket");

	// Step 2: validate the decoded/entered ticket code against the backend.
	const validateCode = useCallback(
		async (code: string) => {
			setState("validating");
			setErrorMsg("");
			setTicketDetail(null);
			setTicketCode(null);
			setNik(null);
			setFaceBlob(null);
			try {
				const result = await getTicketDetail(code, nikInput);
				console.log("🚀 ~ TicketVerificationPage ~ result:", result);

				if (!result) {
					setErrorMsg(
						"Kode tiket tidak ditemukan. Pastikan tiket sesuai dengan acara ini.",
					);
					setState("failed");
					return;
				}

				if (result.registered) {
					setErrorMsg(
						"Tiket yang Anda input telah teregistrasi oleh sistem kami, silakan masukkan tiket lain.",
					);
					setState("failed");
					return;
				}

				const { detail } = result;
				setTicketDetail(detail);
				setTicketCode(detail.ticketTag || code);
				setNik(nikInput);
				setFaceBlob(null);
				setState("success");
			} catch (err) {
				console.error(err);
				setErrorMsg(
					getApiErrorMessage(
						err,
						"Gagal memvalidasi tiket. Periksa koneksi lalu coba lagi.",
					),
				);
				setState("failed");
			}
		},
		[nikInput, setFaceBlob, setTicketCode, setNik, setTicketDetail],
	);

	// Step 1: decode QR/barcode from the uploaded file.
	const handleFile = useCallback(
		async (file: File) => {
			if (!isValidNik(nikInput)) {
				setErrorMsg("Masukkan NIK 16 digit sebelum mengunggah tiket.");
				setState("failed");
				return;
			}

			const isPdf = file.type === "application/pdf";
			const isImage = file.type.startsWith("image/");
			if (!isPdf && !isImage) {
				setErrorMsg("File harus berformat PDF atau gambar (JPG/PNG).");
				setState("failed");
				return;
			}
			if (file.size > MAX_FILE_SIZE) {
				setErrorMsg("Ukuran file maksimal 5 MB.");
				setState("failed");
				return;
			}
			setFileName(file.name);
			setState("scanning");
			setErrorMsg("");

			try {
				const code = isPdf
					? await scanBarcodeFromPdf(file)
					: await scanBarcodeFromImage(file);
				if (!code) {
					setErrorMsg("Barcode tidak terdeteksi pada file.");
					setState("failed");
					return;
				}
				await validateCode(code);
			} catch (err) {
				console.error(err);
				setErrorMsg(
					getApiErrorMessage(err, "Gagal memproses file. Coba file lain."),
				);
				setState("failed");
			}
		},
		[nikInput, validateCode],
	);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (file) handleFile(file);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const file = e.dataTransfer.files?.[0];
		if (file) handleFile(file);
	};

	const handleRetry = () => {
		setState("idle");
		setErrorMsg("");
		setFileName("");
		setTicketDetail(null);
		setTicketCode(null);
		setNik(null);
		setFaceBlob(null);
		setManualCode("");
		setNikInput("");
		setUploadMode(false);
	};

	const handleManualSubmit = () => {
		const trimmed = manualCode.trim().toUpperCase();
		if (!trimmed || !isValidNik(nikInput)) return;
		setFileName("Input manual");
		validateCode(trimmed);
	};

	const handleNikChange = (value: string) => {
		const normalizedNik = normalizeNik(value);
		setNikInput(normalizedNik);
		setNik(normalizedNik || null);
	};

	const handleContinue = () => {
		if (ticketCode && isValidNik(nikInput) && !isNavigating) {
			setIsNavigating(true);
			setStep("face");
			router.push("/verification/face");
		}
	};

	if (isNavigating) {
		return <TransitionLoading message="Menyiapkan verifikasi wajah..." />;
	}

	if (!allowed) return null;

	return (
		<>
			<HeaderSection />

			<div className="space-y-6">
				<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
					<div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 gap-2">
						<div className="flex items-center gap-2 min-w-0">
							<FileText className="w-5 h-5 text-primary shrink-0" />
							<span className="font-semibold text-[#1e2a4a] truncate">
								Data Tiket
							</span>
						</div>
						<span
							className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${
								state === "success"
									? "text-emerald-600 bg-emerald-50 border-emerald-200"
									: "text-primary bg-primary-50 border-primary-200"
							}`}>
							{state === "success" ? "Selesai" : "Langkah 1 dari 2"}
						</span>
					</div>

					<div className="px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center text-center">
						{state === "idle" && !uploadMode && (
							<ManualInputState
								value={manualCode}
								onChange={setManualCode}
								nik={nikInput}
								onNikChange={handleNikChange}
								onSubmit={handleManualSubmit}
								onSwitchUpload={() => setUploadMode(true)}
							/>
						)}
						{state === "idle" && uploadMode && (
							<UploadState
								nik={nikInput}
								onNikChange={handleNikChange}
								onPickFile={() => fileInputRef.current?.click()}
								onDrop={handleDrop}
								onSwitchManual={() => setUploadMode(false)}
							/>
						)}
						{state === "scanning" && <ScanningState fileName={fileName} />}
						{state === "validating" && <ValidatingState />}
						{state === "success" && (
							<SuccessState
								fileName={fileName}
								ticketCode={ticketCode}
								nik={nikInput}
								detail={ticketDetail}
							/>
						)}
						{state === "failed" && (
							<FailedState
								message={errorMsg}
								onSwitchManual={() => {
									setUploadMode(false);
									setState("idle");
									setErrorMsg("");
								}}
							/>
						)}
						<input
							ref={fileInputRef}
							type="file"
							accept="application/pdf,image/*"
							className="hidden"
							onChange={handleFileChange}
						/>
					</div>

					{["failed", "success"].includes(state) && (
						<>
							<FooterMobileBtn
								children={
									<>
										{state === "failed" && (
											<Button
												onClick={handleRetry}
												className="inline-flex min-w-0 w-full items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-600 transition-colors">
												Coba Lagi
											</Button>
										)}
										{state === "success" && (
											<Button
												onClick={handleRetry}
												className="inline-flex min-w-0 w-full items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/25  font-medium text-sm text-white hover:bg-primary-50 transition-colors">
												Ganti Tiket
											</Button>
										)}

										{state === "success" && (
											<Button
												onClick={handleContinue}
												disabled={isNavigating}
												className="inline-flex min-w-0 w-full items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-600 transition-colors">
												Lanjutkan
												<ArrowRight className="w-4 h-4" />
											</Button>
										)}
									</>
								}
							/>

							<div
								className={`hidden px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 md:flex items-center gap-2 ${state === "failed" ? "justify-end" : "justify-between"}`}>
								{state === "failed" && (
									<button
										onClick={handleRetry}
										className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-600 transition-colors">
										Coba Lagi
									</button>
								)}
								{state === "success" && (
									<button
										onClick={handleRetry}
										className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/25 text-primary font-medium text-sm hover:bg-primary-50 transition-colors">
										Ganti Tiket
									</button>
								)}

								{state === "success" && (
									<button
										onClick={handleContinue}
										disabled={isNavigating}
										className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-600 transition-colors">
										Lanjutkan
										<ArrowRight className="w-4 h-4" />
									</button>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

function UploadState({
	nik,
	onNikChange,
	onPickFile,
	onDrop,
	onSwitchManual,
}: {
	nik: string;
	onNikChange: (v: string) => void;
	onPickFile: () => void;
	onDrop: (e: React.DragEvent) => void;
	onSwitchManual: () => void;
}) {
	const [dragOver, setDragOver] = useState(false);
	const nikValid = isValidNik(nik);
	return (
		<>
			<h2 className="text-xl font-bold text-[#1e2a4a] mb-2">Unggah Tiket</h2>
			<p className="text-gray-500 text-sm max-w-md mb-4">
				Masukkan NIK terlebih dahulu, lalu unggah tiket agar sistem dapat
				membaca kode QR/barcode secara otomatis.
			</p>

			<NikInput value={nik} onChange={onNikChange} />

			<div
				onClick={() => {
					if (nikValid) onPickFile();
				}}
				onDragOver={(e) => {
					e.preventDefault();
					if (nikValid) setDragOver(true);
				}}
				onDragLeave={() => setDragOver(false)}
				onDrop={(e) => {
					setDragOver(false);
					if (nikValid) onDrop(e);
				}}
				className={`w-full max-w-md border-2 border-dashed rounded-xl px-5 py-8 sm:px-6 sm:py-10 transition-colors ${
					!nikValid
						? "cursor-not-allowed border-gray-200 bg-gray-100 opacity-70"
						: dragOver
							? "cursor-pointer border-primary bg-primary-50"
							: "cursor-pointer border-gray-300 bg-gray-50 hover:border-primary hover:bg-primary-50/50"
				}`}>
				<div className="flex flex-col items-center gap-3">
					<div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
						<Upload className="w-7 h-7 text-primary" />
					</div>
					<p className="text-sm font-medium text-[#1e2a4a]">
						{nikValid
							? "Pilih file tiket atau seret ke sini"
							: "Lengkapi NIK 16 digit terlebih dahulu"}
					</p>
					<p className="text-xs text-gray-500">
						Format PDF, JPG, atau PNG. Maksimal 5 MB.
					</p>
				</div>
			</div>

			<button
				onClick={onSwitchManual}
				className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-primary font-medium text-sm hover:bg-primary-50 transition-colors cursor-pointer">
				Isi kode tiket manual
			</button>
		</>
	);
}

function ManualInputState({
	value,
	onChange,
	nik,
	onNikChange,
	onSubmit,
	onSwitchUpload,
}: {
	value: string;
	onChange: (v: string) => void;
	nik: string;
	onNikChange: (v: string) => void;
	onSubmit: () => void;
	onSwitchUpload: () => void;
}) {
	const formValid = Boolean(value.trim() && isValidNik(nik));

	return (
		<>
			<h2 className="text-lg sm:text-xl font-bold text-[#1e2a4a] mb-2">
				Masukkan Data Tiket
			</h2>
			<p className="text-gray-500 text-sm max-w-md mb-4">
				Isi kode tiket dan NIK sesuai identitas yang akan didaftarkan.
			</p>

			<div className="w-full max-w-md space-y-3 text-left">
				<label className="block">
					<span className="mb-1.5 block text-xs font-semibold text-gray-600">
						Kode Tiket
					</span>
					<input
						type="text"
						value={value}
						onChange={(e) => onChange(e.target.value)}
						placeholder="Contoh: TIK-ABCD-1234"
						className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#1e2a4a] placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
					/>
				</label>

				<NikInput value={nik} onChange={onNikChange} />

				<button
					onClick={onSubmit}
					disabled={!formValid}
					className={`mt-3 hidden md:inline-flex w-full  items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-colors ${
						formValid
							? "bg-primary hover:bg-primary-600"
							: "bg-gray-300 cursor-not-allowed"
					}`}>
					Cek Tiket
				</button>

				<FooterMobileBtn
					children={
						<Button
							onClick={onSubmit}
							disabled={!formValid}
							className={`md:hidden w-full inline-flex  items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-colors ${
								formValid
									? "bg-primary hover:bg-primary-600"
									: "bg-gray-800 cursor-not-allowed"
							}`}>
							Cek Tiket
						</Button>
					}
				/>
			</div>

			<button
				onClick={onSwitchUpload}
				className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-primary font-medium text-sm hover:bg-primary-50 transition-colors cursor-pointer">
				<Upload className="w-4 h-4" />
				Scan dari file tiket
			</button>
		</>
	);
}

function NikInput({
	value,
	onChange,
}: {
	value: string;
	onChange: (v: string) => void;
}) {
	const hasValue = value.length > 0;
	const valid = isValidNik(value);

	return (
		<label className="block w-full max-w-md text-left mb-3">
			<span className="mb-1.5 block text-xs font-semibold text-gray-600">
				NIK
			</span>
			<input
				type="text"
				inputMode="numeric"
				autoComplete="off"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="16 digit NIK"
				className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#1e2a4a] placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
			/>
			<p
				className={`mt-1.5 text-xs ${
					hasValue && !valid ? "text-red-500" : "text-gray-400"
				}`}>
				{hasValue && !valid
					? `${value.length}/${NIK_LENGTH} digit — NIK harus 16 digit angka.`
					: "NIK digunakan untuk pendaftaran data diri."}
			</p>
		</label>
	);
}

function ScanningState({ fileName }: { fileName: string }) {
	return (
		<>
			<div className="relative mb-6">
				<div className="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center">
					<Loader2 className="w-12 h-12 text-primary animate-spin" />
				</div>
			</div>
			<h2 className="text-xl font-bold text-[#1e2a4a] mb-2">
				Memindai Tiket...
			</h2>
			<p className="text-gray-500 text-sm max-w-md">
				Sedang memproses{" "}
				<span className="font-medium text-[#1e2a4a]">{fileName}</span>
			</p>
			<div className="inline-flex items-center gap-2 mt-4 text-xs text-gray-400">
				<ScanLine className="w-4 h-4" />
				Mencari QR/barcode pada file
			</div>
		</>
	);
}

function SuccessState({
	fileName,
	ticketCode,
	nik,
	detail,
}: {
	fileName: string;
	ticketCode: string | null;
	nik: string;
	detail: TicketDetail | null;
}) {
	return (
		<>
			<div className="relative mb-6">
				<div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center">
					<div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
						<CheckCircle2 className="w-10 h-10 text-emerald-500" />
					</div>
				</div>
			</div>
			<h2 className="text-xl font-bold text-[#1e2a4a] mb-2">
				Tiket Terverifikasi
			</h2>

			<div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 text-left space-y-3">
				{detail?.eventName && (
					<DetailRow label="Nama" value={detail.eventName} />
				)}
				{detail?.ticketCategory && (
					<DetailRow label="Kategori" value={detail.ticketCategory} />
				)}
				{detail?.ticketStatus && (
					<DetailRow label="Status" value={detail.ticketStatus} />
				)}
				{detail?.ticketTag && (
					<DetailRow label="Kode Tiket" value={detail.ticketTag} />
				)}

				<DetailRow label="NIK" value={nik} />
			</div>
		</>
	);
}

function DetailRow({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="text-xs text-gray-500 mb-0.5">{label}</p>
			<p className="text-sm font-semibold text-[#1e2a4a]">{value}</p>
		</div>
	);
}

function ValidatingState() {
	return (
		<>
			<div className="relative mb-6">
				<div className="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center">
					<Loader2 className="w-12 h-12 text-primary animate-spin" />
				</div>
			</div>
			<h2 className="text-xl font-bold text-[#1e2a4a] mb-2">
				Mengecek Tiket...
			</h2>
			<p className="text-gray-500 text-sm max-w-md">
				Mohon tunggu, sistem sedang mengecek data tiket Anda.
			</p>
		</>
	);
}

function FailedState({
	message,
	onSwitchManual,
}: {
	message: string;
	onSwitchManual: () => void;
}) {
	return (
		<>
			<div className="relative mb-6">
				<div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
					<div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
						<XCircle className="w-10 h-10 text-red-500" />
					</div>
				</div>
			</div>
			<h2 className="text-xl font-bold text-[#1e2a4a] mb-2">
				Verifikasi Tiket Gagal
			</h2>
			<p className="text-gray-500 text-sm max-w-md mb-2">{message}</p>
		</>
	);
}

// function SecurityBanner() {
// 	return (
// 		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 sm:px-6 py-4 sm:py-5">
// 			<div className="flex items-start gap-2">
// 				<Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
// 				<div>
// 					<h3 className="font-semibold text-[#1e2a4a] text-sm">
// 						Tiket Anda Aman
// 					</h3>
// 					<p className="text-sm text-gray-500 mt-1 leading-relaxed">
// 						File diproses sepenuhnya di perangkat Anda. Hanya kode tiket yang
// 						akan digunakan untuk proses verifikasi.
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

async function scanBarcodeFromImage(file: File): Promise<string | null> {
	const { BrowserMultiFormatReader } = await import("@zxing/browser");
	const reader = new BrowserMultiFormatReader();

	const url = URL.createObjectURL(file);
	try {
		const img = await loadImage(url);
		const canvas = document.createElement("canvas");
		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;
		const ctx = canvas.getContext("2d");
		if (!ctx) return null;
		ctx.drawImage(img, 0, 0);

		try {
			const result = await reader.decodeFromCanvas(canvas);
			return result?.getText() ?? null;
		} catch {
			return null;
		}
	} finally {
		URL.revokeObjectURL(url);
	}
}

function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
}

async function scanBarcodeFromPdf(file: File): Promise<string | null> {
	const pdfjs = await import("pdfjs-dist");
	pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

	const { BrowserMultiFormatReader } = await import("@zxing/browser");
	const reader = new BrowserMultiFormatReader();

	const arrayBuffer = await file.arrayBuffer();
	const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

	for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
		const page = await pdf.getPage(pageNum);
		const viewport = page.getViewport({ scale: 3 });

		const canvas = document.createElement("canvas");
		canvas.width = viewport.width;
		canvas.height = viewport.height;
		const ctx = canvas.getContext("2d");
		if (!ctx) continue;

		await page.render({ canvasContext: ctx, viewport, canvas }).promise;

		try {
			const result = await reader.decodeFromCanvas(canvas);
			if (result?.getText()) {
				return result.getText();
			}
		} catch {
			// no barcode on this page, continue
		}
	}

	return null;
}
