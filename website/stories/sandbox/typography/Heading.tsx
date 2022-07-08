import { Heading } from "@navikt/ds-react";
import { SandboxComponentT } from "../types";

const HeadingSandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    ...(props?.as !== "" ? { as: props?.as } : {}),
  };

  return (
    <Heading
      {...newProps}
      spacing={props?.spacing}
      level={props?.level}
      size={props?.size}
    >
      {props?.tekst}
    </Heading>
  );
};

HeadingSandbox.args = {
  props: {
    level: ["1", "2", "3", "4", "5", "6"],
    size: ["xlarge", "large", "medium", "small", "xsmall"],
    spacing: false,
    tekst: "The red fox jumps over the lazy brown dog.",
    as: "",
  },
};

HeadingSandbox.getCode = (props: any) => {
  return `<Heading
  ${props?.spacing ? "spacing" : ""}
  level="${props?.level}"
  size="${props?.size}"
  ${props?.as !== "" ? `as="${props?.as}"` : ""}
>
  ${props?.tekst}
</Heading>`;
};

export default HeadingSandbox;
