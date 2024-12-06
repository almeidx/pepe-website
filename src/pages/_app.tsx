import { openSans } from "@/app/(old)/fonts";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<main
			className={`${openSans.variable} scroll-smooth font-sans antialiased selection:bg-lrk-primary selection:text-lrk-white`}
		>
			<Component {...pageProps} />
		</main>
	);
}
