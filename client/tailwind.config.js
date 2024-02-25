/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#2563eb"
      }
    },
    screens: {
      'sm': '420px',
      'md': '700px',
      'lg': '920px',
    }
  },
  plugins: [],
}