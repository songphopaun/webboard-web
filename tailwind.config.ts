import type { Config } from 'tailwindcss';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                castoro: ['Castoro', 'serif'],
                ibm: ['IBM Plex Sans Thai', 'sans-serif'],
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                brand: {
                    green500: '#243831',
                    green300: '#2B5F44',
                    green100: '#D8E9E4',
                    golden: '#C5A365',
                },
                base: {
                    black: '#000000',
                    white: '#ffffff',
                    grey100: '#BBC2C0',
                    grey300: '#939494',
                    success: '#49A569',
                    error: '#F23536',
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
