import typography from "@tailwindcss/typography";
import scrollbars from "tailwind-scrollbar";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import colors from "tailwindcss/colors";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx,css,svg,md,mdx}", "./theme.config.jsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-open-sans)", ...fontFamily.sans],
			},
			screens: {
				xs: "475px",
			},
			boxShadow: {
				"dim-inner": "0px 0px 10px 0px #00000080 inset",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
				"lrk-background": "#171717",
				"lrk-white": "#e2e2e2",
				blurple: "#5865f2",
				"lrk-primary": "#ff7077",
				darker: "#1e1f22",
				"light-gray": "#474747",
				"dark-gray": "#232323",
				red: {
					...colors.red,
					DEFAULT: "#df4444",
				},
				yellow: {
					...colors.yellow,
					DEFAULT: "#fbb748",
				},
				green: {
					...colors.green,
					DEFAULT: "#3ea25e",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			backgroundImage: {
				"gradient-radial": "linear-gradient(92.52deg, #ff7077 0%, #ffe87c 100%)",
				"gradient-radial-hover": "linear-gradient(93deg, #ffe87c 0%, #804994 100%)",
				"gradient-lurkr-max": "linear-gradient(90deg, #aad6c6 1%, #fa9079 33%, #fcc953 66%, #74da9c 100%)",
				"gradient-lurkr-ultimate": "linear-gradient(90deg, #a2fbec 1%, #f985ff 33%, #904dff 66%, #4d54fe 100%)",
				patreon: "linear-gradient(93.24deg, #ff424d 0%, #ff7077 100%)",
			},
			backgroundSize: {
				"size-10": "10px 10px",
			},
			textShadow: {
				regular: "1.5px 1.5px 0px rgba(0, 33, 66, 0.95)",
			},
			dropShadow: {
				regular: "1.5px 1.5px 0px rgba(0, 33, 66, 0.95)",
			},
			keyframes: {
				"pulse-success": {
					"0%, 100%": {
						backgroundColor: "rgba(62, 162, 94, 1)",
					},
					"50%": {
						backgroundColor: "rgba(62, 162, 94, 0.6)",
					},
				},
			},
			animation: {
				"pulse-success": "pulse-success 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [
		typography(),

		scrollbars({ nocompatible: true }),

		// https://www.hyperui.dev/blog/text-shadow-with-tailwindcss
		plugin(({ matchUtilities, theme }) => {
			matchUtilities({ "text-shadow": (value) => ({ textShadow: value }) }, { values: theme("textShadow") });
		}),

		plugin(({ addVariant, e: escapeClass }) => {
			// @ts-expect-error: Tailwind types are wrong
			addVariant("slider-thumb", ({ modifySelectors, separator }) => {
				modifySelectors(({ className }: { className: string }) => {
					return `.${escapeClass(`slider-thumb${separator}${className}`)}::-webkit-slider-thumb, .${escapeClass(
						`slider-thumb${separator}${className}`,
					)}::-moz-range-thumb`;
				});
			});
		}),
		animate,
	],
} satisfies Config;
