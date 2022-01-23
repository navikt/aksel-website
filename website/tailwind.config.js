/* eslint-disable no-undef */
module.exports = {
  presets: [require("./ds.config")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        0: 0,
      },
      screens: {
        md: "564px",
        lg: "768px",
        xl: "1024px",
        "2xl": "1440px",
      },
      minHeight: {
        header: "calc(100vh - var(--header-height))",
      },
      keyframes: {
        fadeInBottom: {
          "0%": { transform: "translateY(2.5rem)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        fadeInBottom: "fadeInBottom 0.30s ease-in-out forwards",
      },
    },
  },
};
