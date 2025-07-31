import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				arcade: ['Press Start 2P', 'monospace'],
				mono: ['Roboto Mono', 'monospace']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				arcade: {
					glow: 'hsl(var(--arcade-glow))',
					screen: 'hsl(var(--arcade-screen-bg))',
					console: 'hsl(var(--arcade-console-bg))',
					scanline: 'hsl(var(--arcade-scanline))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fly-slow': {
					'0%': { transform: 'translateX(-100px) translateY(0px)' },
					'100%': { transform: 'translateX(calc(100vw + 100px)) translateY(-20px)' }
				},
				'fly-medium': {
					'0%': { transform: 'translateX(-100px) translateY(0px)' },
					'100%': { transform: 'translateX(calc(100vw + 100px)) translateY(-40px)' }
				},
				'fly-fast': {
					'0%': { transform: 'translateX(-100px) translateY(0px)' },
					'100%': { transform: 'translateX(calc(100vw + 100px)) translateY(-60px)' }
				},
				'blink-dots': {
					'0%, 20%': { opacity: '1' },
					'21%, 40%': { opacity: '0.3' },
					'41%, 60%': { opacity: '1' },
					'61%, 80%': { opacity: '0.3' },
					'81%, 100%': { opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fly-1': 'fly-slow 20s linear infinite',
				'fly-2': 'fly-medium 12s linear infinite', 
				'fly-3': 'fly-fast 8s linear infinite',
				'blink': 'blink-dots 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
