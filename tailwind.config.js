// tailwind.config.js
import plugin from "tailwindcss/plugin";
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
    },
  },
  plugins: [lineClamp],
};
