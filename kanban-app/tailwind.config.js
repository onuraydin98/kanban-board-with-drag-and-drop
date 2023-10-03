const defaultTheme = require("tailwindcss/defaultTheme")
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./layouts/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            boxShadow: {
                "inner-custom": "inset 0px 0px 13px -4px #7e22cd",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                "coin-flip": {
                    "0%": {
                        transform: "rotate3d(0, 0, 0, 0deg)",
                    },
                    "100%": {
                        transform: "rotate3d(1, 1, 1, 360deg)",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "coin-flip": "coin-flip 1s cubic-bezier(0.22, 0.61, 0.36, 1)",
            },
        },
        screens: {
            xs: "450px",
            ...defaultTheme.screens,
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/container-queries"),
    ],
}
