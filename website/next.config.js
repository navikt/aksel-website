const packageJson = require("./package.json");
const modules = [];
Object.keys(packageJson.dependencies).forEach((key) => {
  if (key.startsWith("@navikt/")) {
    modules.push(key);
  }
});

const withTM = require("next-transpile-modules")(modules);

module.exports = withTM({
  future: {
    webpack5: true,
  },
});
