/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Brand colors */
        darkbg: "#0a0a0a",
        charcoal: "#1a1a1a",
        gold: "var(--color-gold)",
        goldMuted: "var(--color-gold-muted)",

        /* Text */
        grayLight: "#e5e5e5",
        grayMid: "#9ca3af",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      spacing: {
        "xs": "0.5rem",
        "sm": "1rem",
        "md": "1.5rem",
        "lg": "2rem",
        "xl": "3rem",
        "2xl": "4rem",
        "3xl": "6rem",
      },
    },
  },
  plugins: [],
};
