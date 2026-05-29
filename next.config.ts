import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",

	experimental: {
		optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
	},

	// Image optimization
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ui.shadcn.com",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
		formats: ["image/webp", "image/avif"],
	},
};

export default nextConfig;
