/* eslint-disable no-undef */
module.exports = {
  presets: [require("@navikt/ds-tailwind")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
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
        shimmerBg: {
          "0%": { backgroundSize: "400% 400%", backgroundPosition: "0% 0%" },
          "50%": {
            backgroundSize: "400% 400%",
            backgroundPosition: "100% 100%",
          },
          "100%": { backgroundSize: "400% 400%", backgroundPosition: "0% 0%" },
        },
        fadeInBottom: {
          "0%": { transform: "translateY(2.5rem)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        fadeInRight: {
          "0%": { width: "20%", opacity: 0.5 },
          "100%": { width: "100%", opacity: 1 },
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
        shimmerBg: "shimmerBg 15s ease infinite",
        fadeInBottom: "fadeInBottom 0.30s ease-in-out forwards",
        fadeInRight: "fadeInRight 0.30s ease-in-out forwards",
        fadeIn: "fadeIn 0.15s cubic-bezier(0.65, 0, 0.35, 1)",
        expand: "expand 0.15s cubic-bezier(0.215, 0.61, 0.355, 1)",
        expandLg: "expandLg 0.15s cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      fontFamily: {
        code: ["Source Code Pro"],
      },
    },
  },
};
