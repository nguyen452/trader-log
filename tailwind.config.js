/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'traderBlue': '#2f70f2'
      },
      width: {
        '500px': '500px'
      },
      height: {
        '68px': '68px'
      },
    },
  },
  plugins: [],
}
