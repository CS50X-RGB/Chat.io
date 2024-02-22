/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#82AAFF",
      },
      fontFamily: {
        chakra: ["Chakra Petch", "sans-serif"],
        ostwald: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};
