/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const withTM = require("next-transpile-modules")(["@navikt/ds-tokens"]);
const oldRedirects = require("./redirects.json");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
  withTM({
    async redirects() {
      return [
        {
          source: "localhost:3000",
          destination: "/designsystem",
          permanent: true,
        },
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
  })
);
