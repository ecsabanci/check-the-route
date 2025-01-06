/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      rotate: {
        '360': '360deg',
        '180': '180deg',
        '90': '90deg',
      }
    }
  },
  plugins: [],
}