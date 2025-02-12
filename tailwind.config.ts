import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'1-color-modes-colors-background-bg-primary': 'var(--1-color-modes-colors-background-bg-primary)',
  			'1-color-modes-colors-background-bg-secondary': 'var(--1-color-modes-colors-background-bg-secondary)',
  			'1-color-modes-colors-border-border-primary': 'var(--1-color-modes-colors-border-border-primary)',
  			'1-color-modes-colors-border-border-secondary': 'var(--1-color-modes-colors-border-border-secondary)',
  			'1-color-modes-colors-foreground-fg-success-secondary': 'var(--1-color-modes-colors-foreground-fg-success-secondary)',
  			'1-color-modes-colors-text-text-primary-900': 'var(--1-color-modes-colors-text-text-primary-900)',
  			'1-color-modes-colors-text-text-secondary-hover': 'var(--1-color-modes-colors-text-text-secondary-hover)',
  			'1-color-modes-colors-text-text-tertiary-600': 'var(--1-color-modes-colors-text-text-tertiary-600)',
  			'1-color-modes-component-colors-components-avatars-avatar-contrast-border': 'var(--1-color-modes-component-colors-components-avatars-avatar-contrast-border)',
  			'1-color-modes-component-colors-utility-gray-utility-gray-700': 'var(--1-color-modes-component-colors-utility-gray-utility-gray-700)',
  			'1-color-modes-component-colors-utility-success-utility-success-500': 'var(--1-color-modes-component-colors-utility-success-utility-success-500)',
  			'primitives-colors-base-white': 'var(--primitives-colors-base-white)',
  			'primitives-colors-gray-light-mode-200': 'var(--primitives-colors-gray-light-mode-200)',
  			'primitives-colors-gray-light-mode-300': 'var(--primitives-colors-gray-light-mode-300)',
  			'primitives-colors-gray-light-mode-50': 'var(--primitives-colors-gray-light-mode-50)',
  			'primitives-colors-gray-light-mode-600': 'var(--primitives-colors-gray-light-mode-600)',
  			'primitives-colors-gray-light-mode-700': 'var(--primitives-colors-gray-light-mode-700)',
  			'primitives-colors-gray-light-mode-800': 'var(--primitives-colors-gray-light-mode-800)',
  			'primitives-colors-gray-light-mode-900': 'var(--primitives-colors-gray-light-mode-900)',
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
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			'text-md-semibold': 'var(--text-md-semibold-font-family)',
  			'text-sm-regular': 'var(--text-sm-regular-font-family)',
  			'text-sm-semibold': 'var(--text-sm-semibold-font-family)',
  			'text-xs-medium': 'var(--text-xs-medium-font-family)',
  			sans: [
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif',
  				'Apple Color Emoji"',
  				'Segoe UI Emoji"',
  				'Segoe UI Symbol"',
  				'Noto Color Emoji"'
  			]
  		},
  		boxShadow: {
  			'focus-rings-focus-ring': 'var(--focus-rings-focus-ring)',
  			'shadows-shadow-xs': 'var(--shadows-shadow-xs)'
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	},
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: ["class"],
} satisfies Config;