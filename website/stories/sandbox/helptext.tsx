import { HelpText } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

const HelptextSandbox: SandboxComponentT = (props: any) => {
  return (
    <HelpText title="Hvor kommer dette fra?" placement={props?.placement}>
      Informasjonen er hentet fra X sin statistikk fra 2021
    </HelpText>
  );
};

HelptextSandbox.args = {
  props: {
    placement: [
      "top",
      "bottom",
      "right",
      "left",
      "top-start",
      "top-end",
      "bottom-start",
      "bottom-end",
      "right-start",
      "right-end",
      "left-start",
      "left-end",
      "auto",
      "auto-start",
      "auto-end",
    ],
  },
};

HelptextSandbox.getCode = (props: any) => {
  return `<HelpText
  title="Hvor kommer dette fra?"
  placement="${props?.placement}"
>
  Informasjonen er hentet fra X sin statistikk fra 2021
</HelpText>`;
};

export default HelptextSandbox;
