import { BodyShort } from "@navikt/ds-react";
import { SandboxComponentT } from "../types";

const BodyShortSandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    ...(props?.as !== "" ? { as: props?.as } : {}),
  };

  return (
    <BodyShort {...newProps} spacing={props?.spacing} size={props?.size}>
      {props?.tekst}
    </BodyShort>
  );
};

BodyShortSandbox.args = {
  props: {
    size: ["medium", "small"],
    spacing: false,
    tekst: "The red fox jumps over the lazy brown dog.",
    as: "",
  },
};

BodyShortSandbox.getCode = (props: any) => {
  return `<BodyShort
  ${props?.spacing ? "spacing" : ""}
  ${props?.size !== "medium" ? `size="${props?.size}"` : ""}
  ${props?.as !== "" ? `as="${props?.as}"` : ""}
>
  ${props?.tekst}
</BodyShort>`;
};

export default BodyShortSandbox;
