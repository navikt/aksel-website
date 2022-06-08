import { ConfirmationPanel } from "@navikt/ds-react";
import { useState } from "react";
import { SandboxComponentT } from "./types";

ConfirmationPanel.displayName = "ConfirmationPanel";

const ConfirmationPanelSandbox: SandboxComponentT = (props: any) => {
  const [checked, setChecked] = useState(false);
  const newProps = {
    ...(props?.error ? { error: "Du må samtykke før du kan fortsette." } : {}),
  };

  return (
    <ConfirmationPanel
      checked={checked}
      onChange={() => {
        setChecked(!checked);
      }}
      label="Ja, jeg samtykker."
      size={props?.size ?? "medium"}
      {...newProps}
    >
      For å komme videre må du gi oss lov til å hente inn og bruke opplysninger
      om deg.
    </ConfirmationPanel>
  );
};

ConfirmationPanelSandbox.args = {
  props: {
    size: ["medium", "small"],
    error: false,
  },
};

export default ConfirmationPanelSandbox;
