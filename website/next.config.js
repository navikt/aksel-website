/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const withTM = require("next-transpile-modules")(["@navikt/ds-tokens"]);
const oldRedirects = require("./redirects.json");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const { withSentryConfig } = require("@sentry/nextjs");

const ContentSecurityPolicy = `
default-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' cdn.sanity.io data:; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; report-uri https://sentry.gc.nav.no/api/113/security/ https://sentry.gc.nav.no/api/113/envelope/?sentry_key=d35bd60e413c489ca0f2fd389b4e6e5e&sentry_version=7'; connect-src 'self' https://amplitude.nav.no https://sentry.gc.nav.no/api/113/security/ https://sentry.gc.nav.no/api/113/envelope/?sentry_key=d35bd60e413c489ca0f2fd389b4e6e5e&sentry_version=7';
`;

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.trim(),
  },
];

module.exports = withSentryConfig(
  withBundleAnalyzer(
    withTM({
      async headers() {
        return [
          {
            source: "/:path*",
            headers: securityHeaders,
          },
        ];
      },
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
      swcMinify: true,
    })
  ),
  { silent: true }
);
