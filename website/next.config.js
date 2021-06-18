const packageJson = require("./package.json");
const modules = [];
Object.keys(packageJson.dependencies).forEach((key) => {
  /**
   * Nextjs does not as of june 2021 support esm import/export syntax
   * TODO: Remove this when this issue is fixed
   *  */
  if (key.startsWith("@navikt/") || key === "examples") {
    modules.push(key);
  }
});

/**
 * Allows us to run the sanity content studio on subpath "/studio"
 */
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
  // Makes sure we can load images form cdn
  images: {
    domains: ["cdn.sanity.io"],
  },
});
