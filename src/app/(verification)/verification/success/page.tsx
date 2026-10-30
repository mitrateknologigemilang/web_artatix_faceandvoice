"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useVerification } from "../../VerificationContext";
import { useRouter } from "next/navigation";
import HeaderSection from "../../components/HeaderSection";
import FooterMobileBtn from "../../components/FooterMobileBtn";
import { Button } from "@/components/ui/button";

export default function VerificationSuccessPage() {
	const router = useRouter();
	const { clearVerification } = useVerification();

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

			<div className="my-auto py-10 flex flex-col items-center text-center">
				{/* Success Icon */}
				<div className="relative mb-5">
					<div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center relative ring-4 ring-emerald-50/50">
						<div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
							<CheckCircle2 className="w-8 h-8 text-emerald-500" />
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
					Registrasi Selesai!
				</h2>
				<p className="text-slate-500 text-xs leading-relaxed max-w-xs">
					Data biometrik Anda telah berhasil disimpan. Identitas Anda kini
					terhubung dengan tiket untuk akses masuk pada hari acara.
				</p>
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
