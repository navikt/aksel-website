import { Alert, Heading } from "@navikt/ds-react";
import { SandboxComponentv2 } from "./types";

Alert.displayName = "Alert";
(Heading as any).displayName = "Heading";

const AlertSandbox: SandboxComponentv2 = (props: any) => {
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

  return (
    <Alert
      variant={props?.variant}
      size={props?.size}
      fullWidth={props?.fullWidth}
      inline={props?.inline}
    >
      {props?.Komposisjon === "Med heading" && (
        <Heading spacing size="small" level="3">
          Melding
        </Heading>
      )}
      {text}
    </Alert>
  );
};

AlertSandbox.args = {
  props: {
    variant: ["success", "info", "warning", "error"],
    size: ["medium", "small"],
    fullWidth: false,
    inline: false,
    Komposisjon: ["Uten heading", "Med heading"],
  },
};

export default AlertSandbox;
