/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '275px',
        'xs': '475px',
      },
      colors: {
        'range-thumb': '#394448', // Color del thumb
        'range-track': '#D135DB', // Color del track
      },
    },
  },
  plugins: [],
}

