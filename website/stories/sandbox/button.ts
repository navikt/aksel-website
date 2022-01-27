import { SandboxComponent } from "./types";

const ButtonSandbox: SandboxComponent = (props, variant) => {
  const propVariant = props?.variant ? ` variant="${props.variant}"` : "";
  const propDisabled = props?.disabled ? ` disabled` : "";
  const propLoading = props?.loading ? ` loading` : "";
  const propIkon = props?.Ikon ? `<Star />` : "";
  const propSize = props?.size ? ` size="${props.size}"` : "";

  const comp = `<Button${propVariant}${propSize}${propLoading}${propDisabled}>${propIkon}${props.Tekst}</Button>`;

  switch (variant) {
    case "":
      return comp;
    default:
      return comp;
  }
};

ButtonSandbox.args = {
  props: {
    Tekst: "Button",
    variant: ["primary", "secondary", "tertiary", "danger"],
    size: ["medium", "small"],
    loading: false,
    disabled: false,
    Ikon: false,
  },
};

export default ButtonSandbox;
