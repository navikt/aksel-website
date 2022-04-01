module.exports = function (config, options) {
  config.module.rules[0].exclude = {
    test: /(node_modules|bower_components)/,
    not: [/@radix-ui/, /@floating-ui/],
  };
  return config;
};
