import { SandboxComponent } from "./types";

const HelptextSandbox: SandboxComponent = (props) => {
  const placement = props.placement ? ` placement="${props.placement}"` : "";

  return `<HelpText title="Hvor kommer dette fra?"${placement}>
  Informasjonen er hentet fra X sin statistikk fra 2021
</HelpText>`;
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

export default HelptextSandbox;
