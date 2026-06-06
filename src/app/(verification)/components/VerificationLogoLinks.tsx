"use client";

import Image from "next/image";
import artatixLogo from "@/assets/artatix-logo.svg";
import jomloFestLogo from "@/assets/jomlo-fest-logo.svg";
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
				<Image width={100} height={25} src={artatixLogo} alt="Artatix" />
			</button>

			<button
				type="button"
				onClick={handleReset}
				className="flex h-16 items-center"
				aria-label="Kembali ke verifikasi tiket">
				<Image width={70} height={25} src={jomloFestLogo} alt="Jomlo Fest" />
			</button>
		</>
	);
}
