"use client";

import Image from "next/image";
import artatixLogo from "@/assets/artatix-logo.svg";
import jomloFestLogo from "@/assets/jomlo-fest-logo.png";
import { useVerification } from "../VerificationContext";

export function VerificationLogoLinks() {
	const { clearVerification } = useVerification();

	const handleReset = () => {
		clearVerification();
		window.location.replace("/verification/ticket");
	};

	return (
		<>
			<button
				type="button"
				onClick={handleReset}
				className="flex h-10 items-center active:scale-95 transition-transform"
				aria-label="Kembali ke verifikasi tiket">
				<Image width={92} height={22} src={artatixLogo} alt="Artatix" />
			</button>

			<button
				type="button"
				onClick={handleReset}
				className="flex h-10 items-center active:scale-95 transition-transform"
				aria-label="Kembali ke verifikasi tiket">
				<Image
					unoptimized
					width={64}
					height={22}
					src={jomloFestLogo}
					alt="Jomlo Fest"
				/>
			</button>
		</>
	);
}
