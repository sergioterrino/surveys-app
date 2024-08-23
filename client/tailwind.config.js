/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '275px',
        'xxs': '475px',
        'xxxs': '515px',
        'xxxxs': '570px',
        'llg': '1170px'
      },
      colors: {
        'range-thumb': '#394448', // Color del thumb
        'range-track': '#D135DB', // Color del track
      },
    },
  },
  plugins: [],
}

