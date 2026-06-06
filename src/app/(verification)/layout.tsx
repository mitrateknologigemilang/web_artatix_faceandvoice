import React from "react";
import Link from "next/link";
import Image from "next/image";
import { inter } from "@/lib/fonts";
import artatixLogo from "@/assets/artatix-logo.svg";
import jomloFestLogo from "@/assets/jomlo-fest-logo.svg";
import { VerificationProvider } from "./VerificationContext";

export default function VerificationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<VerificationProvider>
			<div className="min-h-screen flex flex-col bg-[#f0f2f8]">
				{/* Header */}
				<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
					<div className="mx-auto flex justify-between px-4 sm:px-6 lg:px-12">
						<Link href="/" className="flex items-center  h-16">
							<Image width={100} height={25} src={artatixLogo} alt={""}></Image>
						</Link>

						<Link href="/" className="flex items-center  h-16">
							<Image
								width={70}
								height={25}
								src={jomloFestLogo}
								alt={""}></Image>
						</Link>
					</div>
				</header>

				{/* Main Content */}
				<main className="flex-1 flex flex-col items-center p-3 sm:p-4">
					<div className="w-full max-w-175">{children}</div>
				</main>

				{/* Footer */}
				<footer className="py-4 sm:py-6 text-center bg-white">
					<p className="text-sm text-gray-500">
						© 2026 Artatix. All rights reserved.
					</p>
				</footer>
			</div>
		</VerificationProvider>
	);
}
