import { Alert, BodyLong, Heading } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

const getText = (variant) => {
  let text = "Alert";

  switch (variant) {
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
  return text;
};

const AlertSandbox: SandboxComponentT = (props: any) => {
  return (
    <Alert
      variant={props?.variant}
      size={props?.size}
      fullWidth={props?.fullWidth}
      inline={props?.inline}
      className="w-[90%]"
    >
      {props?.Komposisjon === "Med heading" ? (
        <>
          <Heading spacing size="small" level="3">
            Melding
          </Heading>
          <BodyLong>{getText(props?.variant)}</BodyLong>
        </>
      ) : (
        getText(props?.variant)
      )}
    </Alert>
  );
};

AlertSandbox.args = {
  props: {
    variant: ["info", "success", "warning", "error"],
    size: ["medium", "small"],
    fullWidth: false,
    inline: false,
    Komposisjon: ["Uten heading", "Med heading"],
  },
};

AlertSandbox.getCode = (props: any) => {
  return `<Alert
  variant="${props?.variant}"
  size="${props?.size}"${props?.fullWidth ? "\n  fullWidth" : ""}${
    props?.inline ? "\n  inline" : ""
  }
>
  ${
    props?.Komposisjon === "Med heading"
      ? `<Heading spacing size="small" level="3">Melding</Heading>\n  <BodyLong>${getText(
          props?.variant
        )}</BodyLong>`
      : `${getText(props?.variant)}`
  }
</Alert>`;
};

export default AlertSandbox;
