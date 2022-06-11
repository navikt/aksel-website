import { readFileSync } from "fs";
import css from "css";

export const readCss = () => {
  const cssData = readFileSync(
    "../node_modules/@navikt/ds-tokens/dist/tokens.css"
  ).toString();
  return css.parse(cssData);
};

export const getCssRoot = (css) => {
  return css.stylesheet.rules.find((r) => r.selectors?.includes(":root"));
};
