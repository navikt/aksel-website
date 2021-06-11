const packageJson = require("./package.json");
const modules = [];
Object.keys(packageJson.dependencies).forEach((key) => {
  if (key.startsWith("@navikt/")) {
    modules.push(key);
  }
});

const STUDIO_REWRITE = {
  source: "/studio/:path*",
  destination:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/studio/:path*"
      : "/studio/index.html",
};

const withTM = require("next-transpile-modules")(modules);

module.exports = withTM({
  rewrites: () => [STUDIO_REWRITE],
  productionBrowserSourceMaps: true,
  future: {
    webpack5: true,
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
});
