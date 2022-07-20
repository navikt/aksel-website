import { Star } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

const ButtonSandbox: SandboxComponentT = (props: any) => {
  const iconProp = {
    ...(props?.Komposisjon === "Ikon"
      ? { title: "Beskrivelse for skjermlesere" }
      : { ["aria-hidden"]: true }),
  };

  const newProps = {
    ...(props?.disabled ? { disabled: true } : {}),
    ...(props?.loading ? { loading: true } : {}),
    ...(props?.Komposisjon?.includes("Ikon")
      ? { icon: <Star {...iconProp} /> }
      : {}),
    ...(props?.Komposisjon?.endsWith("Ikon")
      ? { iconPosition: "right" as "left" | "right" }
      : { iconPosition: "left" as "left" | "right" }),
  };

  return (
    <Button variant={props?.variant} size={props?.size} {...newProps}>
      {props?.Komposisjon?.includes("Tekst") && "Button"}
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
  }${
    props?.Komposisjon.includes("Ikon")
      ? `\n  icon={<Star ${
          props?.Komposisjon === "Ikon"
            ? `title="Beskrivelse for skjermlesere"`
            : "aria-hidden"
        } />}`
      : ""
  }${props?.Komposisjon === "Tekst + Ikon" ? `iconPosition="right"` : ""}
>
   ${props?.Komposisjon === "Ikon" ? "" : "Button"}
</Button>`;
};

export default ButtonSandbox;
