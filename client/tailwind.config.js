/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
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

