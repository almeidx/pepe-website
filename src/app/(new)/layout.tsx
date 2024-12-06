import "./globals.css";
import { openSans } from "@/app/(old)/fonts.ts";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { BRAND_COLOR, DESCRIPTION } from "@/utils/constants.ts";
import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${openSans.variable} scroll-smooth bg-background font-sans text-foreground antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<SidebarProvider>{children}</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

export const metadata: Metadata = {
	title: {
		default: "Lurkr",
		template: "%s • Lurkr",
	},
	description: DESCRIPTION,

	keywords: ["Lurkr", "Lurkr Bot", "Lurkr Invite", "Lurkr Discord", "Emoji Manager", "Emoji Manager Discord", "Lurker"],

	openGraph: {
		siteName: "Lurkr",
		type: "website",
	},

	manifest: "/manifest.json",
	icons: { apple: "/apple-icon-180.png", icon: "/icon.png" },
	appleWebApp: { title: "Lurkr", capable: true },
	applicationName: "Lurkr",
	other: {
		"msapplication-square70x70logo": "mstile-icon-128.png",
		"msapplication-square150x150logo": "mstile-icon-270.png",
		"msapplication-square310x310logo": "mstile-icon-558.png",
		"msapplication-wide310x150logo": "mstile-icon-558-270.png",
		"msapplication-TileColor": BRAND_COLOR,
	},
};

export const viewport: Viewport = {
	themeColor: BRAND_COLOR,
};
