import ButtonDanger from "./pages/examples/button/Danger";
import ButtonAllVariants from "./pages/examples/button/all-variants";
import ButtonDisabled from "./pages/examples/button/Disabled";
import ButtonPrimary from "./pages/examples/button/Primary";
import ButtonSecondary from "./pages/examples/button/Secondary";
import ButtonTertiary from "./pages/examples/button/Tertiary";
import ButtonWithIcon from "./pages/examples/button/WithIcon";
import ButtonWithLoader from "./pages/examples/button/WithLoader";
import kebabCase from "lodash.kebabcase";

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
