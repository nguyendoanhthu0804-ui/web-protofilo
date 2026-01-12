/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'pastel-pink': '#FFD1DC',    
                'creamy-white': '#FDFBF7',   
                'periwinkle': '#CCCCFF',     
                'warm-yellow': '#FFEFD5',    
                'charcoal': '#36454F',       
            },
            fontFamily: {
                'handwriting': ['Patrick Hand', 'cursive'],
                'mono': ['Fira Code', 'monospace'],
            }
        },
    },
    plugins: [],
}