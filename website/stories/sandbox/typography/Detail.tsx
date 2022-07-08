import { Detail } from "@navikt/ds-react";
import { SandboxComponentT } from "../types";

const DetailSandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    ...(props?.as !== "" ? { as: props?.as } : {}),
  };

  return (
    <Detail {...newProps} spacing={props?.spacing} uppercase={props?.uppercase}>
      {props?.tekst}
    </Detail>
  );
};

DetailSandbox.args = {
  props: {
    spacing: false,
    uppercase: false,
    tekst: "The red fox jumps over the lazy brown dog.",
    as: "",
  },
};

DetailSandbox.getCode = (props: any) => {
  return `<Detail
  ${props?.spacing ? "spacing" : ""}
  ${props?.uppercase ? "uppercase" : ""}
  ${props?.as !== "" ? `as="${props?.as}"` : ""}
>
  ${props?.tekst}
</Detail>`;
};

export default DetailSandbox;
