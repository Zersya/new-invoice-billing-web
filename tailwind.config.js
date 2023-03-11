/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./node_modules/flowbite.{js,ts}",
        "./node_modules/flowbite/**/*.js",
        "./assets/**/*.css"
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#ff732b",
                    100: "#ff732b",
                    200: "#ff6a22",
                    300: "#f56118",
                    400: "#ea580c",
                    500: "#ea580c",
                    600: "#ea580c",
                    700: "#df4f00",
                    800: "#d54600",
                    900: "#ca3c00",
                },
                info: {
                    50: "#0acbff",
                    100: "#00bcef",
                    200: "#00a8d6",
                    300: "#00a3d0",
                    400: "#0094bd",
                    500: "#0094bc",
                    600: "#0094bd",
                    700: "#0080a3",
                    800: "#006c89",
                    900: "#005870",
                },
                background: "#1E1E1E"
            },
            animation: {
                'spin-once': 'spin 0.35s ease-in-out 1',
                'fade-in': 'fade-in 0.35s ease-in-out 1',
                'fade-out': 'fade-out 0.35s ease-in-out 1',
                'slide-in': 'slide-in 0.35s ease-in-out 1',
                'slide-out': 'slide-out 0.35s ease-in-out 1'
            },
            keyframes: {
                'spin-once': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'fade-in': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                'fade-out': {
                    '0%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
                'slide-in': {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0%)' },
                },
                'slide-out': {
                    '0%': { transform: 'translateY(0%)' },
                    '100%': { transform: 'translateY(100%)' },
                }
            },
            variants: {
                animation: ['responsive', 'motion-safe', 'motion-reduce'],
            },
        },
        fontFamily: {
            sans: ['Lato', 'system-ui', 'sans-serif'],
            serif: ['Baskerville', 'Palatino', 'serif'],
        },
    },
    plugins: [require("flowbite"), require('flowbite/plugin')],
};
