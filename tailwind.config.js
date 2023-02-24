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
                    50: "#f57b7b",
                    100: "#f36363",
                    200: "#f25858",
                    300: "#f14c4c",
                    400: "#EF3434",
                    500: "#EF3434",
                    600: "#EF3434",
                    700: "#ed1c1c",
                    800: "#de1212",
                    900: "#c71010",
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
        },
        fontFamily: {
            sans: ["Poppins", "sans-serif"],
            serif: ["Poppins", "serif"],
            body: ["Poppins", "sans-serif"],
        },
    },
    plugins: [require("flowbite"), require('flowbite/plugin')],
};
