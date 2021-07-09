/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const packageJson = require("./package.json");
const modules = [];
// Remember to remove deps in package.json when less is removed
const withLess = require("next-with-less");

Object.keys(packageJson.dependencies).forEach((key) => {
  /**
   * Nextjs does not as of june 2021 support esm import/export syntax
   * TODO: Remove this when this issue is fixed
   *  */
  if (
    key.startsWith("@navikt/") ||
    key === "examples" ||
    key.startsWith("nav-frontend-")
  ) {
    modules.push(key);
  }
});

const withTM = require("next-transpile-modules")(modules);

module.exports = withLess(
  withTM({
    productionBrowserSourceMaps: true,
    // Makes sure we can load images form cdn
    images: {
      domains: ["cdn.sanity.io"],
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
  })
);
