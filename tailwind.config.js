/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'traderBlue': '#2f70f2',
        'backgroudGrey': '#F5F6FA',
        'softRed': '#EF627A',
        'softGreen': '#00C49F',
      },
      width: {
        '500px': '500px',
        '420px': '420px'
      },
      height: {
        '70px': '70px',
        '768px': '768px'
      },
    },
  },
  plugins: [],
}
