const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {};
module.exports = {
  stories: ["../stories/**/*.story.tsx", "../components/**/*.story.tsx"],
  addons: [
    "storybook-addon-next",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    /* {
      name: "@storybook/addon-postcss",
      options: {
        cssLoaderOptions: {
          // When you have splitted your css over multiple files
          // and use @import('./other-styles.css')
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          // When using postCSS 8
          implementation: require("postcss"),
        },
      },
    } */
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
    options: {
      lazyCompilation: false,
      fsCache: true,
    },
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
  },
  /* webpackFinal: async (config) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    return config;
  }, */
};
