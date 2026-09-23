import { DM_Sans, Funnel_Display } from "next/font/google";

// Configure DM Sans font to match exactly what Next.js optimizes for
export const dmSans = DM_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-sans",
});

export const funnel = Funnel_Display({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-funnel",
});
