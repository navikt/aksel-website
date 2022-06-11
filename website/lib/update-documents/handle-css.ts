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

export const getGlobalToken = (value: string, root: any): string => {
  const varToken = value.match(/var\((.*)\)/)[1];
  if (!varToken) return value;

  let rawToken = "";

  const parentToken = root.declarations.find(
    (x) => x.property === varToken
  ).value;
  if (parentToken.includes("var(")) {
    rawToken = getGlobalToken(parentToken, root);
  } else {
    rawToken = parentToken;
  }

  return value.replace(/var\((.*)\)/, rawToken);
};
