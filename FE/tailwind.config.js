/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-fig': '#2B2C33',
        'gray-1': '#515151',
        'gray-2': '#F0F0F0',
        'gradient-1': '#F66A4B',
        'gradient-2': '#A24AE7',
        'gradient-3': '#4859F3',
        'yellow-fig': '#F19E38'
      }
    },
  },
  plugins: [],
}

