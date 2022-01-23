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
      },
    },
  },
};
