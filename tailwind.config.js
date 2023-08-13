/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:"jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      "chakra":["Chakra Petch","sans-serif"],
      "ostwald":["Oswald",'sans-serif'],
    }
  },
  plugins: [],
}