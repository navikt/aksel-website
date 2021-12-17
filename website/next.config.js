/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const withTM = require("next-transpile-modules")(["@navikt/ds-tokens"]);
const oldRedirects = require("./redirects.json");

module.exports = withTM({
  async redirects() {
    return [
      {
        source: "/preview/:slug*",
        destination: "/api/preview?slug=:slug*",
        permanent: true,
      },
      ...Object.values(oldRedirects).reduce((old, value) => {
        return [
          ...old,
          ...value.sources.map((source) => ({
            source,
            destination: value.destitation,
            permanent: false,
          })),
        ];
      }, []),
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
