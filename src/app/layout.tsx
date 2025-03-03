import { Toaster } from "@/components/ui/Sonner";
import Header from "./(root)/(components)/Header";
import "highlight.js/styles/monokai.css";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "FiveM Tools",
	description: "A collection of handy tools for FiveM developers and server owners.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="font-geist-sans flex h-screen flex-col overflow-hidden bg-zinc-950 antialiased">
				<Header />
				<main className="flex flex-1 overflow-hidden">{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
