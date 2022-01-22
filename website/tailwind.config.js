/* eslint-disable no-undef */
module.exports = {
  presets: [require("./ds.config")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "564px",
        md: "768px",
      },
    },
  },
};
