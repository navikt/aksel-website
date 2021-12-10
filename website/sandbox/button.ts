import { SandboxComponent } from "./types";

const ButtonSandbox: SandboxComponent = (props, variant) => {
  console.log(props);
  const propVariant = props?.variant ? ` variant="${props.variant}"` : "";
  const propDisabled = props?.disabled ? ` disabled` : "";
  const propSize = props?.size ? ` size="${props.size}"` : "";

  const comp = `<Button${propVariant}${propSize}${propDisabled}>Knapp</Button>`;
  const compIcon = `<Button${propVariant}${propSize}${propDisabled}><Star /></Button>`;
  const compLoader = `<Button${propVariant}${propSize}${propDisabled}><Loader title="Laster inn data"/></Button>`;

  switch (variant) {
    case "standard":
      return comp;
    case "ikon":
      return compIcon;
    case "loader":
      return compLoader;
    default:
      return comp;
  }
};

ButtonSandbox.args = {
  props: {
    variant: ["", "primary", "secondary", "tertiary", "danger"],
    disabled: false,
    size: ["", "medium", "small"],
    teststring: "a-string",
  },
  variants: ["", "ikon", "loader"],
};

export default ButtonSandbox;
