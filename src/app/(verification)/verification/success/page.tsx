"use client";

import {
	ArrowLeft,
	CheckCircle2,
	ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useVerification } from "../../VerificationContext";
import { useRouter } from "next/navigation";
import HeaderSection from "../../components/HeaderSection";
import FooterMobileBtn from "../../components/FooterMobileBtn";
import InfoListCard from "../../components/InfoListCard";
import { Button } from "@/components/ui/button";

export default function VerificationSuccessPage() {
	const router = useRouter();
	const { ticketCode, nik, ticketDetail, clearVerification } =
		useVerification();

	const [snapshot] = useState(() => ({
		ticketCode: ticketDetail?.ticket?.ticketCode || ticketCode,
		nik:
			ticketDetail?.detailTransactionDocument?.identityNumber || nik,
		ownerName:
			ticketDetail?.detailTransactionDocument?.name ||
			ticketDetail?.detailTransactionDocument?.fullname ||
			null,
		category: ticketDetail?.ticket?.category || null,
	}));

	// All steps done — drop the saved progress so a reload starts fresh.
	useEffect(() => {
		clearVerification();
	}, [clearVerification]);

	return (
		<div className="flex flex-col flex-1">
			{/* Segmented Mobile Stepper */}
			<div className="mb-4 flex items-center gap-2">
				<div className="h-1.5 flex-1 rounded-full bg-emerald-500" />
				<div className="h-1.5 flex-1 rounded-full bg-emerald-500" />
			</div>

			<HeaderSection />

			<div className="flex-1 flex flex-col pb-4">
				{/* Clean Status Banner */}
				<div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4 text-left">
					<div className="flex items-start gap-3">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
							<CheckCircle2 className="h-5 w-5" />
						</div>
						<div className="min-w-0">
							<span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-700">
								Registrasi Berhasil
							</span>
							<h1 className="mt-0.5 text-lg font-bold tracking-tight text-[#1e2a4a]">
								Face ID Telah Terdaftar
							</h1>
							<p className="mt-1 text-xs leading-relaxed text-slate-600">
								Data wajah Anda telah terhubung dengan tiket dan siap digunakan
								untuk verifikasi masuk pada hari acara.
							</p>
						</div>
					</div>
				</div>

				{/* Registered Ticket Summary (if available from flow) */}
				{(snapshot.ticketCode || snapshot.ownerName || snapshot.nik) && (
					<div className="mt-4 rounded-2xl border border-slate-200 bg-white overflow-hidden">
						<div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-4 py-2.5">
							<span className="text-xs font-bold text-[#1e2a4a]">
								Ringkasan Registrasi
							</span>
							<span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
								<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
								Terverifikasi
							</span>
						</div>
						<div className="divide-y divide-slate-100 px-4">
							{snapshot.ownerName && (
								<div className="flex items-center justify-between gap-3 py-2.5">
									<span className="text-xs text-slate-500">Nama Pemilik</span>
									<span className="text-xs font-semibold text-[#1e2a4a] text-right truncate">
										{snapshot.ownerName}
									</span>
								</div>
							)}
							{snapshot.category && (
								<div className="flex items-center justify-between gap-3 py-2.5">
									<span className="text-xs text-slate-500">Kategori Tiket</span>
									<span className="text-xs font-semibold text-[#1e2a4a] text-right truncate">
										{snapshot.category}
									</span>
								</div>
							)}
							{snapshot.ticketCode && (
								<div className="flex items-center justify-between gap-3 py-2.5">
									<span className="text-xs text-slate-500">Kode Tiket</span>
									<span className="font-mono text-xs font-bold text-[#1e2a4a]">
										{snapshot.ticketCode}
									</span>
								</div>
							)}
							{snapshot.nik && (
								<div className="flex items-center justify-between gap-3 py-2.5">
									<span className="text-xs text-slate-500">NIK</span>
									<span className="font-mono text-xs font-semibold text-[#1e2a4a]">
										{snapshot.nik}
									</span>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Event Entry Guide Card */}
				<InfoListCard
					className="mt-4"
					title="Panduan Masuk Saat Hari Acara"
					items={[
						{
							title: "Pemindaian Wajah di Gate Masuk",
							desc: "Arahkan wajah ke perangkat pemindai di jalur masuk tanpa mengenakan masker atau kacamata hitam.",
						},
						{
							title: "Siapkan E-Ticket & Identitas",
							desc: "Tetap simpan e-ticket dan KTP/identitas asli sebagai cadangan verifikasi petugas di lokasi.",
						},
						{
							title: "Satu Wajah untuk Satu Tiket",
							desc: "Tiket yang sudah terhubung dengan Face ID bersifat pribadi dan tidak dapat dipindahtangankan.",
						},
					]}
				/>

				{/* Privacy / Security Note */}
				<div className="mt-3 flex items-center gap-2 px-1 text-left">
					<ShieldCheck className="h-4 w-4 shrink-0 text-slate-400" />
					<p className="text-[11px] text-slate-400">
						Data biometrik Anda dienkripsi dan hanya digunakan untuk keperluan
						verifikasi akses acara.
					</p>
				</div>
			</div>

			<FooterMobileBtn
				children={
					<Button
						onClick={() => {
							clearVerification();
							router.push("/verification/ticket");
						}}
						className="inline-flex items-center justify-center gap-2 bg-[#3b5bdb] text-white hover:bg-[#3451c5] transition-colors w-full">
						<ArrowLeft className="w-4 h-4" />
						Daftarkan Tiket Lain
					</Button>
				}
			/>
		</div>
	);
}
