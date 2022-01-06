import { SandboxComponent } from "./types";

const ButtonSandbox: SandboxComponent = (props, variant) => {
  const propVariant = props?.variant ? ` variant="${props.variant}"` : "";
  const propDisabled = props?.disabled ? ` disabled` : "";
  const propSize = props?.size ? ` size="${props.size}"` : "";

  const comp = `<Button${propVariant}${propSize}${propDisabled}>Button</Button>`;
  const compIcon = `<Button${propVariant}${propSize}${propDisabled}><Star /></Button>`;
  const compLoader = `<Button${propVariant}${propSize}${propDisabled}><Loader title="Laster inn data"/></Button>`;

  switch (variant) {
    case "":
      return comp;
    case "Ikon":
      return compIcon;
    case "Loader":
      return compLoader;
    default:
      return comp;
  }
};

ButtonSandbox.args = {
  props: {
    variant: ["", "primary", "secondary", "tertiary", "danger"],
    size: ["", "medium", "small"],
    disabled: false,
  },
  variants: ["", "Ikon", "Loader"],
};

export default ButtonSandbox;
