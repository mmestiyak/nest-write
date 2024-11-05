/** @type {import('tailwindcss').Config} */
import tailwindForm from '@tailwindcss/forms'
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
],
  theme: {
    extend: {},
  },
  plugins: [tailwindForm],
}

