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
                "inner-custom": "inset 4px 4px 12px -6px #f1f5f9",
            },
            colors: {
                dark: "#121212",
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
                "3d-flip": {
                    from: {
                        transform: "rotate3d(0, 0, 0, 0deg)",
                    },
                    to: {
                        transform: "rotate3d(1, 1, 1, 360deg)",
                    },
                },
                "3d-flip-reverse": {
                    from: {
                        transform: "rotate3d(1, 1, 1, 360deg)",
                    },
                    to: {
                        transform: "rotate3d(0, 0, 0, 0deg)",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "3d-flip": "3d-flip .5s cubic-bezier(0.22, 0.61, 0.36, 1)",
                "3d-flip-reverse":
                    "3d-flip-reverse .5s cubic-bezier(0.55, 0.06, 0.68, 0.19)",
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
