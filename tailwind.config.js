/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      colors: {
        "custom-dark-teal": "#0d403d",
        "custom-deep-green": "#1a3c40",
      },
    },
    fontFamily: {
      abc: ["Grey Qo", "cursive"],
      font1: ["Pacifico", "cursive"],
      font2: ["Kalnia Glaze", "cursive"],
      font3: ["Merriweather", "cursive"],
      Playfair: ["Playfair Display", "cursive"],
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }),
  ],
};
