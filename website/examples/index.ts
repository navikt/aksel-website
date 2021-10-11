import kebabCase from "lodash.kebabcase";

/* import ButtonDisabled from "./examples/button/disabled";
import ButtonDanger from "./examples/button/danger";
import ButtonAllVariants from "./examples/button/all-variants";
import ButtonPrimary from "./examples/button/primary";
import ButtonSecondary from "./examples/button/secondary";
import ButtonTertiary from "./examples/button/tertiary";
import ButtonWithIcon from "./examples/button/with-icon";
import ButtonWithLoader from "./examples/button/with-loader"; */

import * as Button from "./button";

const T = {
  ...Button,
};

// TODO: implement such that one can infer the code in preview with dynamic imports
// TODO: is dynamic imports needed?
export const Examples = Object.keys(T).reduce((prev, y) => {
  return { ...prev, [kebabCase(y)]: T[y] };
}, {});

export const ExampleKeys = Object.keys(Examples);
