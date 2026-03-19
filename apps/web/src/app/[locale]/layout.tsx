import Footer from "@/components/footer";
import Header from "@/components/header";
import { IntlProvider } from "@/components/intl-provider";
import Providers from "@/components/providers";
import { routing } from "@/i18n/routing";
import "@mingull/ui/globals.css";
import { cn } from "@mingull/ui/lib/utils";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { Leckerli_One, Merriweather, Poppins, Roboto_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
// import "@/app/globals.css";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-sans",
});
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-serif" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-mono" });
const leckerliOne = Leckerli_One({ subsets: ["latin"], weight: "400", variable: "--font-special" });

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export const generateMetadata = async (): Promise<Metadata> => {
	return {
		title: { template: "%s - Mingull", default: "Niels Plug - Mingull" },
		description: "Personal website of Niels Plug",
	};
};

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<meta name="apple-mobile-web-app-title" content="Mingull" />
			</head>
			<body
				className={cn(
					"bg-background text-foreground flex min-h-screen flex-col font-sans antialiased",
					poppins.variable,
					merriweather.variable,
					robotoMono.variable,
					leckerliOne.variable,
				)}
			>
				<Suspense>
					<IntlProvider locale={locale}>
						<Providers>
							<Header />
							<main className="grow">{children}</main>
							<Footer />
						</Providers>
						{/* </DefaultsProvider> */}
					</IntlProvider>
				</Suspense>
			</body>
		</html>
	);
}
