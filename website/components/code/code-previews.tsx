/* import dynamic from "next/dynamic"; */

import AllButtonVariants from "../../pages/examples/button/all-variants";
import ButtonDanger from "../../pages/examples/button/danger";
import ButtonDisabled from "../../pages/examples/button/disabled";
import ButtonPrimary from "../../pages/examples/button/primary";
import ButtonSecondary from "../../pages/examples/button/secondary";
import ButtontTertiary from "../../pages/examples/button/tertiary";
import ButtonWithIcon from "../../pages/examples/button/with-icon";
import ButtonWithLoader from "../../pages/examples/button/with-loader";

// TODO: implement such that one can infer the code with dynamic imports
// TODO: is dynamic imports needed?

const Examples = {
  "button-all-variants": AllButtonVariants /* dynamic(
    () => import("../../pages/examples/button/all-variants")
  ), */,
  "button-danger": ButtonDanger,
  "button-disabled": ButtonDisabled,
  "button-primary": ButtonPrimary,
  "button-secondary": ButtonSecondary,
  "button-tertiary": ButtontTertiary,
  "button-with-icon": ButtonWithIcon,
  "button-with-loader": ButtonWithLoader,
};

export const CodePreviews = (url) => {
  if (!url || !(url in Examples)) {
    return null;
  }
  const Comp = Examples[url];
  return <Comp />;
};
