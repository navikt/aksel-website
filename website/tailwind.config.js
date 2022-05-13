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
        header: "4rem",
        sidebar: "240px",
        text: "600px",
      },
      maxWidth: {
        "screen-sidebar": "calc(100vw - 240px)",
        "content-w-padding": "896px",
        "aksel-max-w": "1440px",
        text: "600px",
      },
      minWidth: ({ theme }) => ({
        header: "4rem",
        ...theme("spacing"),
      }),
      minHeight: ({ theme }) => ({
        "screen-header": "calc(100vh - 4rem)",
        ...theme("spacing"),
      }),
      screens: {
        /* md: "564px",
        lg: "768px",
        xl: "1024px",
        "2xl": "1440px", */
        toc: "1224px",
      },
      boxShadow: {
        "focus-inset": "inset var(--navds-shadow-focus)",
        "focus-gap": "0 0 0 1px white, var(--navds-shadow-focus)",
        header: "inset 0 -1px 0 rgb(180, 180, 180, 0.1)",
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
        fadeInRight: "fadeInRight 0.30s ease-in-out forwards",
        fadeIn: "fadeIn 0.15s cubic-bezier(0.65, 0, 0.35, 1)",
        expand: "expand 0.15s cubic-bezier(0.215, 0.61, 0.355, 1)",
        expandLg: "expandLg 0.15s cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
    },
  },
};
