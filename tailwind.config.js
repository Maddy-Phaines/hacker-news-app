// tailwind.config.js
import lineClamp from "@tailwindcss/line-clamp";
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sohne: ["sohne", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      screens: {
        mdplus: "904px",
        lgminus: "1080px",
        // ← new “only-mdplus” that runs from 904px up to 1079.98px
        "only-mdplus": { min: "904px", max: "1079.98px" },
      },
      spacing: {
        "header-gutter": "calc(50vw - 50%)",
      },
      boxShadow: {
        "apple-glow": "0 0 30px rgba(0,121,255,0.6)",
        "custom-glow":
          "0 0.0625rem 0.25rem 0 #00000054, 0 0.25rem 0.25rem 0 #00000054",
      },

      keyframes: {
        "glow-pulse": {
          "0%,100%": { transform: "scale(0.9)", opacity: "0.6" },
          "50%": { transform: "scale(1.1)", opacity: "1" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [lineClamp],
};
