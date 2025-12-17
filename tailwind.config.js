/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quanthos-blue': {
          DEFAULT: '#1e40af',
          dark: '#1e3a8a',
        },
        'quanthos-green': {
          DEFAULT: '#059669',
          dark: '#047857',
        },
        'quanthos-orange': {
          DEFAULT: '#ea580c',
          dark: '#c2410c',
        },
        'quanthos-purple': {
          DEFAULT: '#7c3aed',
          dark: '#6d28d9',
        },
      },
    },
  },
  plugins: [],
}