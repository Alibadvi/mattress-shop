import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: [
        './src/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                border: 'hsl(var(--color-border) / <alpha-value>)',
                input: 'hsl(var(--color-input) / <alpha-value>)',
                ring: 'hsl(var(--color-ring) / <alpha-value>)',
                background: 'hsl(var(--color-background) / <alpha-value>)',
                foreground: 'hsl(var(--color-foreground) / <alpha-value>)',
                primary: {
                    DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
                    foreground: 'hsl(var(--color-primary-foreground) / <alpha-value>)',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
                    foreground: 'hsl(var(--color-secondary-foreground) / <alpha-value>)',
                },
                muted: {
                    DEFAULT: 'hsl(var(--color-muted) / <alpha-value>)',
                    foreground: 'hsl(var(--color-muted-foreground) / <alpha-value>)',
                },
                accent: {
                    DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
                    foreground: 'hsl(var(--color-accent-foreground) / <alpha-value>)',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--color-destructive) / <alpha-value>)',
                    foreground: 'hsl(var(--color-foreground) / <alpha-value>)',
                },
                card: {
                    DEFAULT: 'hsl(var(--color-card) / <alpha-value>)',
                    foreground: 'hsl(var(--color-card-foreground) / <alpha-value>)',
                },
                popover: {
                    DEFAULT: 'hsl(var(--color-popover) / <alpha-value>)',
                    foreground: 'hsl(var(--color-popover-foreground) / <alpha-value>)',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}

export default config
