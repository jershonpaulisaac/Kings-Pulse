/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'raisin': '#2A2539',
                'charcoal': '#353044',
                'lavender': '#5E5373',
                'platinum': '#DBD8E3',
            },
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'sculpted': '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
                'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            }
        },
    },
    plugins: [],
}
