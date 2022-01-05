import { SandboxComponent } from "./types";

const LoaderSandbox: SandboxComponent = (props) => {
  const propVariant = props?.variant ? ` variant="${props.variant}"` : "";
  const size = props?.size ? ` size="${props.size}"` : "";
  const transparent = props?.transparent ? ` transparent` : "";
  const title = props?.title ? ` title="${props.title}"` : "";

  return `<Loader${propVariant}${size}${transparent}${title} />`;
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
