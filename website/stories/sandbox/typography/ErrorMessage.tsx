import { ErrorMessage } from "@navikt/ds-react";
import { SandboxComponentT } from "../types";

const ErrorMessageSandbox: SandboxComponentT = (props: any) => {
  return <ErrorMessage size={props?.size}>{props?.tekst}</ErrorMessage>;
};

ErrorMessageSandbox.args = {
  props: {
    size: ["medium", "small"],
    tekst: "Du må fylle ut tekstfeltet før innsending.",
  },
};

ErrorMessageSandbox.getCode = (props: any) => {
  return `<ErrorMessage
  ${props?.size !== "medium" ? `size="${props?.size}"` : ""}
>
  ${props?.tekst}
</ErrorMessage>`;
};

export default ErrorMessageSandbox;
