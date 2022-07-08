import { ErrorMessage } from "@navikt/ds-react";
import { SandboxComponentT } from "../types";

const ErrorMessageSandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    ...(props?.as !== "" ? { as: props?.as } : {}),
  };

  return (
    <ErrorMessage {...newProps} spacing={props?.spacing} size={props?.size}>
      {props?.tekst}
    </ErrorMessage>
  );
};

ErrorMessageSandbox.args = {
  props: {
    size: ["medium", "small"],
    spacing: false,
    tekst: "Du må fylle ut tekstfeltet før innsending.",
    as: "",
  },
};

ErrorMessageSandbox.getCode = (props: any) => {
  return `<ErrorMessage
  ${props?.spacing ? "spacing" : ""}
  ${props?.size !== "medium" ? `size="${props?.size}"` : ""}
  ${props?.as !== "" ? `as="${props?.as}"` : ""}
>
  ${props?.tekst}
</ErrorMessage>`;
};

export default ErrorMessageSandbox;
