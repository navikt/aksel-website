import { Star } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { SandboxComponentv2 } from "./types";

(Button as any).displayName = "Button";
Star.displayName = "Star";
const ButtonSandbox: SandboxComponentv2 = (props: any) => {
  return (
    <Button
      variant={props?.variant}
      size={props?.size}
      disabled={props?.disabled}
      loading={props?.loading}
    >
      {props?.Komposisjon.includes("Ikon") && <Star />}
      {props?.Komposisjon.includes("Tekst") && "Button"}
    </Button>
  );
};

ButtonSandbox.args = {
  props: {
    variant: ["primary", "secondary", "tertiary", "danger"],
    size: ["medium", "small"],
    disabled: false,
    loading: false,
    Komposisjon: ["Tekst", "Ikon", "Tekst og Ikon"],
  },
};

export default ButtonSandbox;
