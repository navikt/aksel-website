/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const withTM = require("next-transpile-modules")(["@navikt/ds-tokens"]);

module.exports = withTM({
  async redirects() {
    return [
      {
        source: "/preview/:slug*",
        destination: "/api/preview?slug=:slug*",
        permanent: true,
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
});
