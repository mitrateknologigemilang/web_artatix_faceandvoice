"use client";

import Image from "next/image";
import beliKercisLogo from "@/assets/logo.webp";
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
				className="flex h-16 items-center"
				aria-label="Kembali ke verifikasi tiket">
				<Image width={200} height={100} src={beliKercisLogo} alt="Artatix" />
			</button>
		</>
	);
}
