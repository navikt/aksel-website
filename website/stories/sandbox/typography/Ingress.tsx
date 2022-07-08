import { Ingress } from "@navikt/ds-react";
import { SandboxComponentT } from "../types";

const IngressSandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    ...(props?.as !== "" ? { as: props?.as } : {}),
  };

  return (
    <Ingress {...newProps} spacing={props?.spacing}>
      {props?.tekst}
    </Ingress>
  );
};

IngressSandbox.args = {
  props: {
    spacing: false,
    tekst: "The red fox jumps over the lazy brown dog.",
    as: "",
  },
};

IngressSandbox.getCode = (props: any) => {
  return `<Ingress
  ${props?.spacing ? "spacing" : ""}
  ${props?.as !== "" ? `as="${props?.as}"` : ""}
>
  ${props?.tekst}
</Ingress>`;
};

export default IngressSandbox;
