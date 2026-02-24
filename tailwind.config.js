/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.6s ease-out",
        slideUp: "slideUp 0.6s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      colors: {
        cream: "#F5F0EB",
        "warm-white": "#FAF8F5",
        charcoal: "#1A1A1A",
        gold: {
          DEFAULT: "#B8860B",
          light: "#D4A843",
          muted: "#C9A96E",
        },
        stone: {
          DEFAULT: "#8B8178",
          light: "#B5ADA6",
        },
        "custom-dark-teal": "#1A1A1A",
        "custom-deep-green": "#2A2520",
      },
    },
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      serif: ["Cormorant Garamond", "Georgia", "serif"],
      abc: ["Cormorant Garamond", "serif"],
      font1: ["Inter", "sans-serif"],
      font2: ["Cormorant Garamond", "serif"],
      font3: ["Inter", "sans-serif"],
      Playfair: ["Cormorant Garamond", "serif"],
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }),
  ],
};
