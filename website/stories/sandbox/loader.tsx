import { Loader } from "@navikt/ds-react";
import { BgColors } from "../../lib/types/types";
import { SandboxComponentT } from "./types";

const LoaderSandbox: SandboxComponentT = (props: any) => {
  const comp = (
    <Loader
      variant={props?.variant}
      size={props?.size}
      title={props?.title ?? ""}
      transparent={props?.transparent}
    />
  );

  return comp;
};

LoaderSandbox.args = {
  props: {
    variant: ["neutral", "interaction", "inverted"],
    size: [
      "3xlarge",
      "2xlarge",
      "xlarge",
      "large",
      "medium",
      "small",
      "xsmall",
    ],
    title: "venter...",
    transparent: false,
  },
};

LoaderSandbox.getBg = (props: any) =>
  props?.variant === "inverted" ? BgColors.INVERTEDGRADIENT : undefined;

LoaderSandbox.getCode = (props: any) => {
  return `<Loader
  variant="${props?.variant}"
  size="${props?.size}"
  title="${props?.title ?? ""}"${props?.transparent ? "\n  transparent" : ""}
/>`;
};

export default LoaderSandbox;
