import { Star } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

const ButtonSandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    ...(props?.disabled ? { disabled: true } : {}),
    ...(props?.loading ? { loading: true } : {}),
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

ButtonSandbox.getCode = (props: any) => {
  let content = "Button";

  switch (props?.Komposisjon) {
    case "Ikon":
      content = `<Star title="Beskrivelse for skjermlesere" />`;
      break;
    case "Tekst + Ikon":
      content = `Button <Star aria-hidden />`;
      break;
    case "Ikon + Tekst":
      content = `<Star aria-hidden /> Button`;
      break;
    default:
      break;
  }

  return `<Button
  variant="${props?.variant}"
  size="${props?.size}"${props?.disabled ? "\n  disabled" : ""}${
    props?.loading ? "\n  loading" : ""
  }
>
  ${content}
</Button>`;
};

export default ButtonSandbox;
