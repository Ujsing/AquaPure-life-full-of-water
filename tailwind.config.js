/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aqua: {
          green: '#00e5a0',
          blue: '#0080ff',
          dark: '#0a1628',
          darker: '#0d2847',
        }
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}