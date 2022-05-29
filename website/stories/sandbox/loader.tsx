import { Loader } from "@navikt/ds-react";
import { BgColors } from "../../lib/types/types";
import { SandboxComponentT } from "./types";

Loader.displayName = "Loader";
const LoaderSandbox: SandboxComponentT = (props: any) => {
  const comp = (
    <Loader
      variant={props?.variant}
      size={props?.size}
      title={props?.title ?? ""}
      transparent={props?.transparent}
    />
  );
  if (props?.variant === "inverted") {
    return { comp, bg: BgColors.INVERTEDGRADIENT };
  }
  return comp;
};

LoaderSandbox.args = {
  props: {
    variant: ["neutral", "interaction", "inverted"],
    size: ["2xlarge", "xlarge", "large", "medium", "small", "xsmall", ""],
    title: "venter...",
    transparent: false,
  },
};

export default LoaderSandbox;
