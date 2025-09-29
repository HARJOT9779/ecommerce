/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 4s infinite',
        'bounce-slower': 'bounce 6s infinite',
      },
    },
  },
  plugins: [],
}
