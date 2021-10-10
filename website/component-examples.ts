import kebabCase from "lodash.kebabcase";

import ButtonDisabled from "./examples/button/disabled";
import ButtonDanger from "./examples/button/danger";
import ButtonAllVariants from "./examples/button/all-variants";
import ButtonPrimary from "./examples/button/primary";
import ButtonSecondary from "./examples/button/secondary";
import ButtonTertiary from "./examples/button/tertiary";
import ButtonWithIcon from "./examples/button/with-icon";
import ButtonWithLoader from "./examples/button/with-loader";

const T = {
  ButtonAllVariants,
  ButtonDanger,
  ButtonDisabled,
  ButtonPrimary,
  ButtonSecondary,
  ButtonTertiary,
  ButtonWithIcon,
  ButtonWithLoader,
};

// TODO: implement such that one can infer the code with dynamic imports
// TODO: is dynamic imports needed?
export const Examples = Object.keys(T).reduce((prev, y) => {
  return { ...prev, [kebabCase(y)]: T[y] };
}, {});

export const ExampleKeys = Object.keys(Examples);
