const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],

  webpackFinal: async (config, { configType }) => {
    config.resolve.modules.push(
      path.resolve(__dirname, "../src/ReactCode.tsx")
    );

    return config;
  },
};
