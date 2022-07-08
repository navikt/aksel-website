import { Label } from "@navikt/ds-react";
import { SandboxComponentT } from "../types";

const LabelSandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    ...(props?.as !== "" ? { as: props?.as } : {}),
  };

  return (
    <Label {...newProps} spacing={props?.spacing} size={props?.size}>
      {props?.tekst}
    </Label>
  );
};

LabelSandbox.args = {
  props: {
    size: ["medium", "small"],
    spacing: false,
    tekst: "The red fox jumps over the lazy brown dog.",
    as: "",
  },
};

LabelSandbox.getCode = (props: any) => {
  return `<Label
  ${props?.spacing ? "spacing" : ""}
  ${props?.size !== "medium" ? `size="${props?.size}"` : ""}
  ${props?.as !== "" ? `as="${props?.as}"` : ""}
>
  ${props?.tekst}
</Label>`;
};

export default LabelSandbox;
