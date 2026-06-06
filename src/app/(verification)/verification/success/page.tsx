"use client";

import { CheckCircle2, Shield } from "lucide-react";
import { useEffect } from "react";
import { useVerification } from "../../VerificationContext";

export default function VerificationSuccessPage() {
	const { clearVerification } = useVerification();

	// All steps done — drop the saved progress so a reload starts fresh.
	useEffect(() => {
		clearVerification();
	}, [clearVerification]);

	return (
		<>
			<div className="text-center pb-3 sm:pb-4 w-full max-w-full overflow-hidden">
				<h1 className="text-xl sm:text-2xl font-bold text-[#1e2a4a] truncate">
					Jomlo Festival 2026 Chapter Bekasi
				</h1>
			</div>

			<div className="space-y-6">
				{/* Main Card */}
				<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
					<div className="px-4 sm:px-6 py-10 sm:py-14 flex flex-col items-center text-center">
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

						<h2 className="text-2xl font-bold text-[#1e2a4a] mb-2">
							Registrasi Selesai!
						</h2>
						<p className="text-gray-500 text-sm max-w-md mb-8">
							Data biometrik Anda telah berhasil dikirim. Identitas Anda kini
							terhubung untuk akses masuk pada hari acara. Terima kasih telah
							melakukan registrasi.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
