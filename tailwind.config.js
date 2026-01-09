/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'pastel-pink': '#FFD1DC',     // Chủ đạo
                'creamy-white': '#FDFBF7',    // Nền
                'periwinkle': '#CCCCFF',      // Tech/Data
                'warm-yellow': '#FFEFD5',     // Điểm nhấn
                'charcoal': '#36454F',        // Chữ
            },
            fontFamily: {
                'handwriting': ['Patrick Hand', 'cursive'], // Bạn nên import font này từ Google Fonts
                'mono': ['Fira Code', 'monospace'],
            }
        },
    },
    plugins: [],
}