/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quanthos-blue': { DEFAULT: '#6D7CFF' },
        'quanthos-magenta': { DEFAULT: '#E344FF' },
        'quanthos-pink': { DEFAULT: '#EB77FF' },
        'quanthos-dark': { DEFAULT: '#493570' },
        'quanthos-lightViolet': { DEFAULT: '#F2AAFF' },
        'quanthos-panel': { DEFAULT: '#F9F9FC' },
      },
    },
  },
  plugins: [],
}
