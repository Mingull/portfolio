"use client";
import { Toaster } from "@mingull/ui/c/sonner";
import { ThemeProvider, useTheme } from "next-themes";

export default function Providers({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ThemeProvider enableSystem attribute="class" defaultTheme="system" disableTransitionOnChange>
			{children}
			<ToastProvider />
		</ThemeProvider>
	);
}

function ToastProvider() {
	const { resolvedTheme } = useTheme();

	return <Toaster position="top-right" theme={resolvedTheme === "dark" ? "dark" : "light"} />;
}
