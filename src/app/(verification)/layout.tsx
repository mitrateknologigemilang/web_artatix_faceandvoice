import React from "react";
import { VerificationProvider } from "./VerificationContext";
import { VerificationLogoLinks } from "./components/VerificationLogoLinks";

export default function VerificationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<VerificationProvider>
			<div className="min-h-dvh w-full mx-auto max-w-md relative flex flex-col bg-white shadow-[0_0_50px_rgba(15,23,42,0.1)]">
				{/* App Bar Header */}
				<header className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40">
					<div className="mx-auto flex h-14 items-center justify-between px-5">
						<VerificationLogoLinks />
					</div>
				</header>

				{/* Main Screen Content */}
				<main className="flex-1 flex flex-col w-full p-4">
					{children}
				</main>
			</div>
		</VerificationProvider>
	);
}
