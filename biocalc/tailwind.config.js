/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          600: '#059669',
          700: '#047857',
          900: '#064e3b',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          900: '#0f172a',
        }
      }
    },
  },
  plugins: [],
}