import { SandboxComponent } from "./types";

const AlertSandbox: SandboxComponent = (props, variant) => {
  const propVariant = props?.variant ? ` variant="${props.variant}"` : "";
  const size = props?.size ? ` size="${props.size}"` : "";
  const fullwidth = props?.fullWidth ? ` fullWidth` : "";
  const inline = props?.inline ? ` inline` : "";

  let text = "Alert";

  switch (props?.variant) {
    case "success":
      text = "Du har sendt søknaden.";
      break;
    case "info":
      text = "Nå kan du sende inn søknaden.";
      break;
    case "warning":
      text =
        "Det er mange som bruker nav.no nå, derfor kan det ta litt tid før søknaden din kommer frem.";
      break;
    case "error":
      text =
        "Det er ikke mulig å sende søknaden akkurat nå, vennligst prøv igjen senere.";
      break;
    default:
      break;
  }

  const comp = `<Alert${propVariant}${size}${fullwidth}${inline}>${text}</Alert>`;
  const compHeading = `
  <Alert${propVariant}${size}${fullwidth}${inline}>
    <Heading spacing size="small" level="3">Melding</Heading>
    ${text}
  </Alert>`;

  switch (variant) {
    case "":
      return comp;
    case "Med heading":
      return compHeading;
    default:
      return comp;
  }
};

AlertSandbox.args = {
  props: {
    variant: ["success", "info", "warning", "error"],
    size: ["", "medium", "small"],
    fullWidth: false,
    inline: false,
  },
  variants: ["", "Med heading"],
};

export default AlertSandbox;
