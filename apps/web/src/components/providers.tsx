"use client";
import { Toaster } from "@mingull/ui/c/sonner";
import { ThemeProvider, useTheme } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function Providers({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ThemeProvider enableSystem attribute="class" defaultTheme="system" disableTransitionOnChange>
			<NuqsAdapter>{children}</NuqsAdapter>
			<ToastProvider />
		</ThemeProvider>
	);
}

function ToastProvider() {
	const { resolvedTheme } = useTheme();

	return <Toaster position="top-right" theme={resolvedTheme === "dark" ? "dark" : "light"} />;
}
