"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { useVerification, useVerificationGuard } from "../../VerificationContext";
import { getTicketDetail, type TicketDetail } from "@/services/verification.service";

type ScanState = "idle" | "scanning" | "validating" | "success" | "failed";

export default function TicketVerificationPage() {
	const [state, setState] = useState<ScanState>("idle");
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [fileName, setFileName] = useState<string>("");
	const [manualMode, setManualMode] = useState(false);
	const [manualCode, setManualCode] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const {
		kodeTiket,
		setKodeTiket,
		ticketDetail,
		setTicketDetail,
		setStep,
	} = useVerification();
	const allowed = useVerificationGuard("ticket");

	// Returning here (via "Kembali") with a validated ticket → show the result.
	useEffect(() => {
		if (allowed && kodeTiket) setState("success");
	}, [allowed, kodeTiket]);

	// Step 2: validate the decoded/entered ticket code against the backend.
	const validateCode = useCallback(
		async (code: string) => {
			setState("validating");
			setErrorMsg("");
			try {
				const detail = await getTicketDetail(code);
				if (!detail) {
					setErrorMsg(
						"Kode tiket tidak ditemukan. Pastikan tiket sesuai dengan acara ini.",
					);
					setState("failed");
					return;
				}
				setTicketDetail(detail);
				setKodeTiket(detail.ticket?.ticketCode || code);
				setState("success");
			} catch (err) {
				console.error(err);
				setErrorMsg("Gagal memvalidasi tiket. Periksa koneksi lalu coba lagi.");
				setState("failed");
			}
		},
		[setKodeTiket],
	);

	// Step 1: decode QR/barcode from the uploaded file.
	const handleFile = useCallback(
		async (file: File) => {
			const isPdf = file.type === "application/pdf";
			const isImage = file.type.startsWith("image/");
			if (!isPdf && !isImage) {
				setErrorMsg("File harus berformat PDF atau gambar (JPG/PNG).");
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
				setErrorMsg("Gagal memproses file. Coba file lain.");
				setState("failed");
			}
		},
		[validateCode],
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
		setKodeTiket(null);
	};

	if (!allowed) return null;

	const handleManualSubmit = () => {
		const trimmed = manualCode.trim();
		if (!trimmed) return;
		setFileName("Input manual");
		validateCode(trimmed);
	};

	const handleContinue = () => {
		if (kodeTiket) {
			setStep("face");
			router.push("/verification/face");
		}
	};

	return (
		<div className="space-y-6">
			<div className="text-center space-y-2 w-full max-w-full overflow-hidden px-2 sm:px-0">
				<h1 className="text-xl sm:text-2xl font-bold text-[#1e2a4a] truncate">
					Jomlo Festival 2026 Chapter Bekasi
				</h1>
			</div>

			<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
				<div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 gap-2">
					<div className="flex items-center gap-2 min-w-0">
						<FileText className="w-5 h-5 text-[#3b5bdb] shrink-0" />
						<span className="font-semibold text-[#1e2a4a] truncate">
							Verifikasi Tiket
						</span>
					</div>
					<span
						className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${
							state === "success"
								? "text-emerald-600 bg-emerald-50 border-emerald-200"
								: "text-[#3b5bdb] bg-blue-50 border-blue-200"
						}`}>
						{state === "success" ? "Selesai" : "Langkah 1 dari 3"}
					</span>
				</div>

				<div className="px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center text-center">
					{state === "idle" && !manualMode && (
						<IdleState
							onPickFile={() => fileInputRef.current?.click()}
							onDrop={handleDrop}
							onSwitchManual={() => setManualMode(true)}
						/>
					)}
					{state === "idle" && manualMode && (
						<ManualInputState
							value={manualCode}
							onChange={setManualCode}
							onSubmit={handleManualSubmit}
							onSwitchUpload={() => setManualMode(false)}
						/>
					)}
					{state === "scanning" && <ScanningState fileName={fileName} />}
					{state === "validating" && <ValidatingState />}
					{state === "success" && (
						<SuccessState
							fileName={fileName}
							kodeTiket={kodeTiket}
							detail={ticketDetail}
						/>
					)}
					{state === "failed" && (
						<FailedState
							message={errorMsg}
							onSwitchManual={() => {
								setManualMode(true);
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

				<div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 flex items-center justify-end gap-2">
					{state === "failed" && (
						<button
							onClick={handleRetry}
							className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#3b5bdb] text-white font-medium text-sm hover:bg-[#3451c5] transition-colors">
							Coba Lagi
						</button>
					)}
					{state === "success" && (
						<>
							<button
								onClick={handleRetry}
								className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
								Ganti Tiket
							</button>
							<button
								onClick={handleContinue}
								className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#3b5bdb] text-white font-medium text-sm hover:bg-[#3451c5] transition-colors">
								Lanjutkan
								<ArrowRight className="w-4 h-4" />
							</button>
						</>
					)}
				</div>
			</div>

			<SecurityBanner />
		</div>
	);
}

function IdleState({
	onPickFile,
	onDrop,
	onSwitchManual,
}: {
	onPickFile: () => void;
	onDrop: (e: React.DragEvent) => void;
	onSwitchManual: () => void;
}) {
	const [dragOver, setDragOver] = useState(false);
	return (
		<>
			<h2 className="text-xl font-bold text-[#1e2a4a] mb-2">
				Unggah Tiket Anda
			</h2>
			<p className="text-gray-500 text-sm max-w-md mb-6">
				Kami akan memindai barcode/QR pada tiket Anda secara otomatis untuk
				mendapatkan kode tiket. Mendukung file PDF dan gambar (JPG/PNG).
			</p>

			<div
				onClick={onPickFile}
				onDragOver={(e) => {
					e.preventDefault();
					setDragOver(true);
				}}
				onDragLeave={() => setDragOver(false)}
				onDrop={(e) => {
					setDragOver(false);
					onDrop(e);
				}}
				className={`w-full max-w-md border-2 border-dashed rounded-xl px-6 py-10 cursor-pointer transition-colors ${
					dragOver
						? "border-[#3b5bdb] bg-blue-50"
						: "border-gray-300 bg-gray-50 hover:border-[#3b5bdb] hover:bg-blue-50/50"
				}`}>
				<div className="flex flex-col items-center gap-3">
					<div className="w-14 h-14 rounded-full bg-[#3b5bdb]/10 flex items-center justify-center">
						<Upload className="w-7 h-7 text-[#3b5bdb]" />
					</div>
					<p className="text-sm font-medium text-[#1e2a4a]">
						Klik untuk pilih file atau seret ke sini
					</p>
					<p className="text-xs text-gray-500">
						PDF atau gambar JPG/PNG (maks 10MB)
					</p>
				</div>
			</div>

			<button
				onClick={onSwitchManual}
				className="mt-4 text-sm text-[#3b5bdb] hover:underline cursor-pointer">
				Masukkan kode tiket secara manual
			</button>
		</>
	);
}

function ManualInputState({
	value,
	onChange,
	onSubmit,
	onSwitchUpload,
}: {
	value: string;
	onChange: (v: string) => void;
	onSubmit: () => void;
	onSwitchUpload: () => void;
}) {
	return (
		<>
			<h2 className="text-xl font-bold text-[#1e2a4a] mb-2">
				Masukkan Kode Tiket
			</h2>
			<p className="text-gray-500 text-sm max-w-md mb-6">
				Ketik kode tiket sesuai dengan yang tertera pada tiket Anda.
			</p>

			<div className="w-full max-w-md">
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Contoh: TKT-ABCD-1234"
					className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-[#1e2a4a] placeholder-gray-400 focus:outline-none focus:border-[#3b5bdb] focus:ring-2 focus:ring-[#3b5bdb]/20"
				/>
				<button
					onClick={onSubmit}
					disabled={!value.trim()}
					className={`mt-3 w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-colors ${
						value.trim()
							? "bg-[#3b5bdb] hover:bg-[#3451c5]"
							: "bg-gray-300 cursor-not-allowed"
					}`}>
					Verifikasi Kode
				</button>
			</div>

			<button
				onClick={onSwitchUpload}
				className="mt-4 text-sm text-[#3b5bdb] hover:underline cursor-pointer">
				← Kembali ke unggah file
			</button>
		</>
	);
}

function ScanningState({ fileName }: { fileName: string }) {
	return (
		<>
			<div className="relative mb-6">
				<div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
					<Loader2 className="w-12 h-12 text-[#3b5bdb] animate-spin" />
				</div>
			</div>
			<h2 className="text-xl font-bold text-[#1e2a4a] mb-2">
				Memindai Barcode...
			</h2>
			<p className="text-gray-500 text-sm max-w-md">
				Sedang memproses{" "}
				<span className="font-medium text-[#1e2a4a]">{fileName}</span>
			</p>
			<div className="inline-flex items-center gap-2 mt-4 text-xs text-gray-400">
				<ScanLine className="w-4 h-4" />
				Mencari barcode/QR pada file
			</div>
		</>
	);
}

function SuccessState({
	fileName,
	kodeTiket,
	detail,
}: {
	fileName: string;
	kodeTiket: string | null;
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
			<h2 className="text-xl font-bold text-[#1e2a4a] mb-2">Tiket Valid!</h2>
			<p className="text-gray-500 text-sm max-w-md mb-4">
				Sumber: <span className="font-medium text-[#1e2a4a]">{fileName}</span>
			</p>

			<div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 text-left space-y-3">
				{detail?.detailTransactionDocument?.name && (
					<DetailRow
						label="Nama"
						value={detail.detailTransactionDocument.name}
					/>
				)}
				{detail?.ticket?.category && (
					<DetailRow label="Kategori" value={detail.ticket.category} />
				)}
				{detail?.status && (
					<DetailRow label="Status" value={detail.status} />
				)}
				<div>
					<p className="text-xs text-gray-500 mb-1">Kode Tiket</p>
					<p className="font-mono text-base font-bold text-[#1e2a4a] break-all">
						{detail?.ticket?.ticketCode || kodeTiket}
					</p>
				</div>
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
				<div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
					<Loader2 className="w-12 h-12 text-[#3b5bdb] animate-spin" />
				</div>
			</div>
			<h2 className="text-xl font-bold text-[#1e2a4a] mb-2">
				Memvalidasi Tiket...
			</h2>
			<p className="text-gray-500 text-sm max-w-md">
				Memeriksa keabsahan kode tiket ke server.
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
			<button
				onClick={onSwitchManual}
				className="text-sm text-[#3b5bdb] hover:underline cursor-pointer">
				Masukkan kode secara manual
			</button>
		</>
	);
}

function SecurityBanner() {
	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 sm:px-6 py-4 sm:py-5">
			<div className="flex items-start gap-2">
				<Shield className="w-5 h-5 text-[#3b5bdb] mt-0.5 shrink-0" />
				<div>
					<h3 className="font-semibold text-[#1e2a4a] text-sm">
						Tiket Anda Aman
					</h3>
					<p className="text-sm text-gray-500 mt-1 leading-relaxed">
						File diproses sepenuhnya di perangkat Anda. Hanya kode tiket yang
						akan digunakan untuk proses verifikasi.
					</p>
				</div>
			</div>
		</div>
	);
}

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
