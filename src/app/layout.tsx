import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarConfigProvider } from "@/contexts/sidebar-context";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
	title: "Artatix Jomlo Festival 2026",
	description:
		"Platform verifikasi wajah dan suara untuk Artatix Jomlo Festival 2026",
	icons: {
		icon: [
			{ url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
			{ url: "/favicon.svg", type: "image/svg+xml" },
		],
		shortcut: "/favicon.ico",
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
	},
	manifest: "/site.webmanifest",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${inter.variable} antialiased`}>
			<body className={inter.className}>
				<ThemeProvider defaultTheme="system" storageKey="nextjs-ui-theme">
					<SidebarConfigProvider>{children}</SidebarConfigProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
