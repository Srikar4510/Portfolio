/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        gray: {
          800: '#2d3748',
          900: '#1a202c',
        },
        purple: {
          700: '#6b46c1',
        },
        blue: {
          700: '#2b6cb0',
          400: '#63b3ed',
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}