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
      boxShadow: {
        "focus-inset": "inset var(--navds-shadow-focus)",
      },
      minHeight: {
        header: "calc(100vh - var(--header-height))",
      },
      keyframes: {
        fadeInBottom: {
          "0%": { transform: "translateY(2.5rem)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        expand: {
          "0%": {
            opacity: 0.2,
            width: "30%",
          },
          "100%": {
            opacity: 1,
            width: "100%",
          },
        },
        expandLg: {
          "0%": {
            opacity: 0.2,
            width: "100px",
          },
          "100%": {
            opacity: 1,
            width: "500px",
          },
        },
      },
      animation: {
        fadeInBottom: "fadeInBottom 0.30s ease-in-out forwards",
        fadeIn: "fadeIn 0.2s cubic-bezier(0.65, 0, 0.35, 1)",
        expand: "expand 0.2s cubic-bezier(0.215, 0.61, 0.355, 1)",
        expandLg: "expandLg 0.2s cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      fontFamily: {
        code: ["Source Code Pro"],
      },
    },
  },
};
