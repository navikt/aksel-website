import { Star } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

(Button as any).displayName = "Button";
Star.displayName = "Star";
const ButtonSandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    ...(props?.disabled ? { disabled: true } : {}),
    ...(props?.loading ? { loading: true } : {}),
    ...(props?.size === "small" ? { loading: true } : {}),
  };
  const iconProps = {
    ...(props?.Komposisjon === "Ikon"
      ? { title: "Beskrivelse for skjermlesere" }
      : { ["aria-hidden"]: true }),
  };

  return (
    <Button variant={props?.variant} size={props?.size} {...newProps}>
      {props?.Komposisjon?.startsWith("Ikon") &&
        !props?.Komposisjon?.endsWith("Ikon") && <Star aria-hidden />}

      {props?.Komposisjon?.includes("Tekst") && "Button"}
      {props?.Komposisjon?.endsWith("Ikon") && <Star {...iconProps} />}
    </Button>
  );
};

ButtonSandbox.args = {
  props: {
    variant: ["primary", "secondary", "tertiary", "danger"],
    size: ["medium", "small"],
    disabled: false,
    loading: false,
    Komposisjon: ["Tekst", "Ikon", "Tekst + Ikon", "Ikon + Tekst"],
  },
};

export default ButtonSandbox;
