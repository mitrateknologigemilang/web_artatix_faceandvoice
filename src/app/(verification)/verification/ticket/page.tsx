"use client";

import React, { useCallback, useRef, useState } from "react";
import {
	ArrowRight,
	CheckCircle2,
	FileText,
	Info,
	Loader2,
	ScanFace,
	ScanLine,
	Shield,
	Upload,
	XCircle,
} from "lucide-react";
import { useVerification } from "../../VerificationContext";
import {
	getApiErrorMessage,
	getTicketDetail,
	type TicketDetail,
} from "@/services/verification.service";
import { preloadFaceDetector } from "@/lib/face-liveness-detector";
import HeaderSection from "../../components/HeaderSection";
import FooterMobileBtn from "../../components/FooterMobileBtn";
import InfoListCard from "../../components/InfoListCard";
import { Button } from "@/components/ui/button";

type ScanState = "idle" | "scanning" | "validating" | "success" | "failed";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const TICKET_CODE_LENGTH = 16;
const NIK_LENGTH = 16;

function normalizeTicketCode(value: string) {
	return value
		.toUpperCase()
		.replace(/[^A-Z0-9]/g, "")
		.slice(0, TICKET_CODE_LENGTH);
}

function isValidTicketCode(value: string) {
	return /^[A-Z0-9]{16}$/.test(value);
}

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
	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		ticketCode,
		setTicketCode,
		nik,
		setNik,
		uploadMode,
		setUploadMode,
		ticketDetail,
		setTicketDetail,
		setFaceBlob,
		setStep,
		clearVerification,
	} = useVerification();

	// Step 2: validate the decoded/entered ticket code against the backend.
	const validateCode = useCallback(
		async (code: string, currentNik: string) => {
			setState("validating");
			setErrorMsg("");
			setTicketDetail(null);
			setTicketCode(code);
			setNik(currentNik);
			setFaceBlob(null);
			try {
				const result = await getTicketDetail(code, currentNik);
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
				setTicketCode(normalizeTicketCode(detail.ticket?.ticketCode || code));
				setNik(currentNik);
				setFaceBlob(null);
				setState("success");
				preloadFaceDetector();
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
		[setFaceBlob, setTicketCode, setNik, setTicketDetail],
	);

	// Step 1: decode QR/barcode from the uploaded file.
	const handleFile = useCallback(
		async (file: File) => {
			if (!isValidNik(nik)) {
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
				const normalizedCode = normalizeTicketCode(code);
				setTicketCode(normalizedCode);
				await validateCode(normalizedCode, nik);
			} catch (err) {
				console.error(err);
				setErrorMsg(
					getApiErrorMessage(err, "Gagal memproses file. Coba file lain."),
				);
				setState("failed");
			}
		},
		[nik, setTicketCode, validateCode],
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
		setFaceBlob(null);
	};

	const handleResetTicket = () => {
		clearVerification();
		setState("idle");
		setErrorMsg("");
		setFileName("");
	};

	const handleManualCodeChange = (value: string) => {
		setTicketCode(normalizeTicketCode(value));
	};

	const handleManualSubmit = () => {
		const normalizedCode = normalizeTicketCode(ticketCode);
		if (!isValidTicketCode(normalizedCode) || !isValidNik(nik)) return;
		setFileName("Input manual");
		validateCode(normalizedCode, nik);
	};

	const handleNikChange = (value: string) => {
		setNik(normalizeNik(value));
	};

	const handleContinue = () => {
		if (isValidTicketCode(ticketCode) && isValidNik(nik)) {
			setStep("face");
		}
	};

	return (
		<div className="flex flex-col flex-1">
			{/* Segmented Mobile Stepper */}
			<div className="mb-4 flex items-center gap-2">
				<div
					className={`h-1.5 flex-1 rounded-full transition-colors ${
						state === "success"
							? "bg-emerald-500"
							: state === "failed"
								? "bg-red-500"
								: "bg-[#3b5bdb]"
					}`}
				/>
				<div className="h-1.5 flex-1 rounded-full bg-slate-100" />
			</div>

			<HeaderSection />

			{state === "idle" && (
				<div className="mb-5 text-left">
					<p className="text-[11px] font-bold uppercase tracking-wider text-[#3b5bdb]">
						Langkah 1 dari 2
					</p>
					<h1 className="mt-0.5 text-xl font-bold tracking-tight text-[#1e2a4a]">
						Verifikasi Data Tiket
					</h1>
					<p className="mt-1 text-xs leading-relaxed text-slate-500">
						Masukkan kode tiket dan 16 digit NIK sesuai identitas KTP Anda.
					</p>

					{/* Native Segmented Control */}
					<div className="mt-4 grid w-full grid-cols-2 rounded-2xl bg-slate-100 p-1">
						<button
							type="button"
							onClick={() => setUploadMode(false)}
							className={`rounded-xl py-2.5 text-xs font-semibold transition-all ${
								!uploadMode
									? "bg-white text-[#1e2a4a] shadow-xs"
									: "text-slate-500 hover:text-slate-700"
							}`}>
							Input Kode
						</button>
						<button
							type="button"
							onClick={() => setUploadMode(true)}
							className={`inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-all ${
								uploadMode
									? "bg-white text-[#1e2a4a] shadow-xs"
									: "text-slate-500 hover:text-slate-700"
							}`}>
							<Upload className="h-3.5 w-3.5" />
							Upload E-Ticket
						</button>
					</div>
				</div>
			)}

			<div className="flex-1 flex flex-col">
				{state === "idle" && !uploadMode && (
					<ManualInputState
						value={ticketCode}
						onChange={handleManualCodeChange}
						nik={nik}
						onNikChange={handleNikChange}
						onSubmit={handleManualSubmit}
						onSwitchUpload={() => setUploadMode(true)}
					/>
				)}
				{state === "idle" && uploadMode && (
					<UploadState
						nik={nik}
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
						nik={nik}
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
				<FooterMobileBtn
					children={
						<>
							{state === "failed" && (
								<Button
									onClick={handleRetry}
									className="inline-flex min-w-0 w-full items-center justify-center gap-2 bg-[#3b5bdb] text-white hover:bg-[#3451c5] transition-colors">
									Coba Lagi
								</Button>
							)}
							{state === "success" && (
								<Button
									onClick={handleResetTicket}
									className="inline-flex min-w-0 w-full items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors">
									Ganti Tiket
								</Button>
							)}

							{state === "success" && (
								<Button
									onClick={handleContinue}
									className="inline-flex min-w-0 w-full items-center justify-center gap-2 bg-[#3b5bdb] text-white hover:bg-[#3451c5] transition-colors">
									Lanjutkan
									<ArrowRight className="w-4 h-4" />
								</Button>
							)}
						</>
					}
				/>
			)}
		</div>
	);
}

function UploadState({
	nik,
	onNikChange,
	onPickFile,
	onDrop,
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
		<div className="w-full text-left space-y-4">
			<NikInput value={nik} onChange={onNikChange} />

			<div>
				<span className="mb-1.5 block text-xs font-semibold text-slate-700">
					File E-Ticket <span className="text-red-500">*</span>
				</span>
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
					className={`w-full border-2 border-dashed rounded-2xl px-4 py-8 text-center transition-all ${
						!nikValid
							? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-65"
							: dragOver
								? "cursor-pointer border-[#3b5bdb] bg-blue-50"
								: "cursor-pointer border-slate-300 bg-slate-50/70 hover:border-[#3b5bdb] active:scale-[0.99]"
					}`}>
					<div className="flex flex-col items-center gap-2.5">
						<div className="w-12 h-12 rounded-2xl bg-[#3b5bdb]/10 flex items-center justify-center">
							<Upload className="w-6 h-6 text-[#3b5bdb]" />
						</div>
						<p className="text-sm font-semibold text-[#1e2a4a]">
							{nikValid
								? "Ketuk untuk pilih file e-ticket"
								: "Isi 16 digit NIK terlebih dahulu"}
						</p>
						<p className="text-xs text-slate-400">
							Mendukung PDF, JPG, atau PNG (Maks. 5 MB)
						</p>
					</div>
				</div>
			</div>

			<TicketGuideCard />
		</div>
	);
}

function ManualInputState({
	value,
	onChange,
	nik,
	onNikChange,
	onSubmit,
}: {
	value: string;
	onChange: (v: string) => void;
	nik: string;
	onNikChange: (v: string) => void;
	onSubmit: () => void;
	onSwitchUpload: () => void;
}) {
	const hasCode = value.length > 0;
	const codeValid = isValidTicketCode(value);
	const formValid = codeValid && isValidNik(nik);

	return (
		<div className="w-full flex-1 flex flex-col text-left gap-4">
			<label className="block w-full text-left">
				<div className="mb-1.5 flex items-center justify-between">
					<span className="text-xs font-semibold text-slate-700">
						Kode Tiket <span className="text-red-500">*</span>
					</span>
					<span
						className={`text-[11px] font-mono font-semibold ${
							codeValid
								? "text-emerald-600"
								: hasCode
									? "text-amber-600"
									: "text-slate-400"
						}`}>
						{value.length}/{TICKET_CODE_LENGTH}
					</span>
				</div>
				<input
					type="text"
					autoComplete="off"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Contoh: 4E02E1D72C4D4264"
					className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 font-mono text-[15px] font-medium uppercase text-[#1e2a4a] placeholder:font-sans placeholder:normal-case placeholder-slate-400 transition-colors focus:border-[#3b5bdb] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/15"
				/>
				<p
					className={`mt-1.5 text-[11px] ${
						hasCode && !codeValid ? "text-red-500" : "text-slate-400"
					}`}>
					{hasCode && !codeValid
						? "Kode tiket harus berjumlah 16 karakter huruf/angka."
						: "Masukkan 16 karakter kode yang tertera di bawah barcode e-ticket."}
				</p>
			</label>

			<NikInput value={nik} onChange={onNikChange} />

			<TicketGuideCard />

			<FooterMobileBtn
				children={
					<Button
						onClick={onSubmit}
						disabled={!formValid}
						className={`w-full inline-flex items-center justify-center gap-2 text-white transition-colors ${
							formValid
								? "bg-[#3b5bdb] hover:bg-[#3451c5]"
								: "bg-slate-300 text-slate-500 cursor-not-allowed"
						}`}>
						Cek Tiket
					</Button>
				}
			/>
		</div>
	);
}

function TicketGuideCard() {
	return (
		<InfoListCard
			className="mt-2"
			title="Panduan Singkat Registrasi"
			items={[
				{
					title: "Cek Kode pada E-Ticket",
					desc: "Temukan kode tiket di bawah QR/Barcode pada PDF e-ticket dari email penerima e-ticket.",
				},
				{
					title: "Masukkan 16 Digit NIK",
					desc: "Pastikan NIK sesuai dengan identitas pemilik tiket. 1 tiket hanya berlaku untuk 1 identitas.",
				},
				{
					title: "Lanjut Ambil Foto Wajah",
					desc: "Setelah tiket terverifikasi, Anda akan diarahkan untuk mengambil foto selfie sebagai akses Face ID.",
				},
			]}
		/>
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
		<label className="block w-full text-left">
			<div className="mb-1.5 flex items-center justify-between">
				<span className="text-xs font-semibold text-slate-700">
					Nomor Induk Kependudukan (NIK) <span className="text-red-500">*</span>
				</span>
				<span
					className={`text-[11px] font-mono font-semibold ${
						valid
							? "text-emerald-600"
							: hasValue
								? "text-amber-600"
								: "text-slate-400"
					}`}>
					{value.length}/{NIK_LENGTH}
				</span>
			</div>
			<input
				type="text"
				inputMode="numeric"
				autoComplete="off"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Masukkan 16 digit NIK sesuai KTP"
				className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 text-[15px] font-medium text-[#1e2a4a] placeholder-slate-400 transition-colors focus:border-[#3b5bdb] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/15"
			/>
			<p
				className={`mt-1.5 text-[11px] ${
					hasValue && !valid ? "text-red-500" : "text-slate-400"
				}`}>
				{hasValue && !valid
					? "NIK harus berjumlah 16 digit angka."
					: "Digunakan untuk pencocokan identitas pemilik tiket."}
			</p>
		</label>
	);
}

function ScanningState({ fileName }: { fileName: string }) {
	return (
		<div className="my-auto py-12 flex flex-col items-center text-center">
			<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50">
				<Loader2 className="w-8 h-8 text-[#3b5bdb] animate-spin" />
			</div>
			<h2 className="text-lg font-bold text-[#1e2a4a] mb-1">
				Memindai E-Ticket...
			</h2>
			<p className="text-slate-500 text-xs max-w-xs truncate">
				Memproses{" "}
				<span className="font-semibold text-[#1e2a4a]">{fileName}</span>
			</p>
			<div className="inline-flex items-center gap-1.5 mt-3 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500">
				<ScanLine className="w-3.5 h-3.5 text-[#3b5bdb]" />
				Mencari QR / Barcode
			</div>
		</div>
	);
}

function SuccessState({
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
		<div className="w-full flex flex-col text-left pb-4">
			{/* Clean Status Banner */}
			<div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4">
				<div className="flex items-start gap-3">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
						<CheckCircle2 className="h-5 w-5" />
					</div>
					<div className="min-w-0">
						<span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-700">
							Langkah 1 Selesai
						</span>
						<h1 className="mt-0.5 text-lg font-bold tracking-tight text-[#1e2a4a]">
							Tiket Terverifikasi
						</h1>
						<p className="mt-1 text-xs leading-relaxed text-slate-600">
							Data tiket dan identitas Anda telah sesuai. Periksa rincian di
							bawah sebelum lanjut ke pengambilan foto wajah.
						</p>
					</div>
				</div>
			</div>

			{/* Ticket Detail Card */}
			<div className="mt-4 w-full rounded-2xl border border-slate-200 bg-white overflow-hidden">
				<div className="flex items-center justify-between bg-slate-50/70 px-4 py-2.5 border-b border-slate-100">
					<span className="text-xs font-bold text-[#1e2a4a]">
						Rincian Pemegang Tiket
					</span>
					<span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
						<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
						Valid & Tersedia
					</span>
				</div>

				<div className="px-4 divide-y divide-slate-100">
					{detail?.detailTransactionDocument?.name && (
						<DetailRow
							label="Nama Pemilik"
							value={detail.detailTransactionDocument.name}
						/>
					)}
					{detail?.ticket?.category && (
						<DetailRow label="Kategori Tiket" value={detail.ticket.category} />
					)}
					{(detail?.ticket?.ticketCode || ticketCode) && (
						<DetailRow
							label="Kode Tiket"
							value={detail?.ticket?.ticketCode || ticketCode || ""}
							mono
						/>
					)}
					<DetailRow label="NIK Terdaftar" value={nik} mono />
				</div>
			</div>

			{/* Next Step Info Card */}
			<div className="mt-4 flex items-start gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/60 p-3.5">
				<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#3b5bdb] border border-slate-200">
					<ScanFace className="h-4 w-4" />
				</div>
				<div className="min-w-0">
					<p className="text-xs font-bold text-[#1e2a4a]">
						Langkah Selanjutnya: Ambil Foto Wajah
					</p>
					<p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
						Siapkan kamera depan di tempat terang dan lepaskan masker atau
						kacamata sebelum menekan tombol <strong>Lanjutkan</strong>.
					</p>
				</div>
			</div>
		</div>
	);
}

function DetailRow({
	label,
	value,
	mono = false,
}: {
	label: string;
	value: string;
	mono?: boolean;
}) {
	return (
		<div className="flex items-center justify-between gap-3 py-2.5">
			<p className="text-xs text-slate-500 shrink-0">{label}</p>
			<p
				className={`text-xs font-semibold text-[#1e2a4a] text-right truncate ${
					mono ? "font-mono font-bold" : ""
				}`}>
				{value}
			</p>
		</div>
	);
}

function ValidatingState() {
	return (
		<div className="my-auto py-12 flex flex-col items-center text-center">
			<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50/70">
				<Loader2 className="w-6 h-6 text-[#3b5bdb] animate-spin" />
			</div>
			<h2 className="text-base font-bold text-[#1e2a4a] mb-1">
				Mengecek Data Tiket...
			</h2>
			<p className="text-slate-500 text-xs max-w-xs leading-relaxed">
				Mohon tunggu, sistem sedang memvalidasi kode tiket dan NIK Anda.
			</p>
		</div>
	);
}

function FailedState({
	message,
}: {
	message: string;
	onSwitchManual: () => void;
}) {
	return (
		<div className="w-full flex flex-col text-left pb-4">
			{/* Clean Error Status Banner */}
			<div className="rounded-2xl border border-red-200/80 bg-red-50/50 p-4">
				<div className="flex items-start gap-3">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
						<XCircle className="h-5 w-5" />
					</div>
					<div className="min-w-0">
						<span className="inline-block text-[11px] font-bold uppercase tracking-wider text-red-700">
							Verifikasi Gagal
						</span>
						<h1 className="mt-0.5 text-lg font-bold tracking-tight text-[#1e2a4a]">
							Tiket Tidak Dapat Diverifikasi
						</h1>
						<p className="mt-1 text-xs leading-relaxed text-slate-600">
							{message ||
								"Data tiket atau NIK tidak ditemukan. Silakan periksa kembali data yang Anda masukkan."}
						</p>
					</div>
				</div>
			</div>

			{/* Troubleshooting / Checklist Card */}
			<InfoListCard
				className="mt-4"
				title="Hal yang Perlu Diperiksa"
				items={[
					{
						title: "Kesesuaian Kode Tiket",
						desc: "Pastikan kode karakter sesuai dengan yang tertera di bawah barcode pada e-ticket Anda.",
					},
					{
						title: "Kesesuaian 16 Digit NIK",
						desc: "Gunakan NIK KTP yang sama dengan identitas yang didaftarkan saat pembelian tiket.",
					},
					{
						title: "Status Pendaftaran Tiket",
						desc: "Setiap kode tiket hanya dapat didaftarkan satu kali untuk satu data wajah (Face ID).",
					},
				]}
			/>
		</div>
	);
}

// function SecurityBanner() {
// 	return (
// 		<div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 sm:px-6 py-4 sm:py-5">
// 			<div className="flex items-start gap-2">
// 				<Shield className="w-5 h-5 text-[#3b5bdb] mt-0.5 shrink-0" />
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
