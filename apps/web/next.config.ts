import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	/* config options here */
	cacheComponents: true,
	transpilePackages: ["next-mdx-remote"],
	images: {
		unoptimized: process.env.NODE_ENV !== "production", // Disable optimization in development for faster builds
		remotePatterns: [
			new URL(process.env.BASE_API_URL ? `${process.env.BASE_API_URL}/**` : "http://localhost:3001/**"), // Allow all images from the API URL
			{
				protocol: process.env.NODE_ENV === "production" ? "https" : "http",
				hostname: process.env.NODE_ENV === "production" ? "api.mingull.nl" : "localhost",
				port: process.env.NODE_ENV === "production" ? undefined : "3001",
				pathname: "/**",
			},
		],
	},
	reactStrictMode: true,
};

const withNextIntl = createNextIntlPlugin({
	experimental: {
		createMessagesDeclaration: ["./messages/nl.json", "./messages/en.json"],
	},
});
export default withNextIntl(nextConfig);
