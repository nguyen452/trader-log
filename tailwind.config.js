/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'traderBlue': '#2f70f2',
        'lightBlue': '#1083EF',
        'backgroundGrey': '#F5F6FA',
        'softRed': '#F17471',
        'softGreen': '#00C49F',
        'softCoral': '#FF6B6B'
      },
      width: {
        '500px': '500px',
        '420px': '420px',
        '352px': '352px',
      },
      height: {
        '70px': '70px',
        '768px': '768px'
      },
      boxShadow: {
        "right": "10px 0px 10px -12px rgba(0, 0, 0, 0.25)",
      }
    },
  },
  plugins: [],
}
