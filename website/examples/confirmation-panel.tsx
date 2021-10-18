import React, { useState } from "react";
import { ConfirmationPanel } from "@navikt/ds-react";

export const ConfirmationPanelExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <ConfirmationPanel
        checked={checked}
        onChange={() => setChecked(!checked)}
        label="Ja, jeg samtykker."
      >
        For å komme videre må du gi oss lov til å hente inn og bruke
        opplysninger om deg.
      </ConfirmationPanel>
    </>
  );
};

ConfirmationPanelExample.react = `<ConfirmationPanel
checked={checked}
onChange={() => handleConfirm}
label="Ja, jeg samtykker."
>
For å komme videre må du gi oss lov til å hente inn og bruke
opplysninger om deg.
</ConfirmationPanel>`;

export const ConfirmationPanelSmall = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <ConfirmationPanel
        size="small"
        checked={checked}
        onChange={() => setChecked(!checked)}
        label="Ja, jeg samtykker."
      >
        For å komme videre må du gi oss lov til å hente inn og bruke
        opplysninger om deg.
      </ConfirmationPanel>
    </>
  );
};

ConfirmationPanelSmall.react = `<ConfirmationPanel
checked={checked}
onChange={() => handleConfirm}
label="Ja, jeg samtykker."
size="small"
>
For å komme videre må du gi oss lov til å hente inn og bruke
opplysninger om deg.
</ConfirmationPanel>`;

export const ConfirmationPanelWithError = () => {
  const [checked] = useState(false);
  return (
    <>
      <ConfirmationPanel
        checked={checked}
        onChange={() => null}
        label="Ja, jeg samtykker."
        error="Du må bekrefte dette før du kan sende inn søknaden."
      >
        For å komme videre må du gi oss lov til å hente inn og bruke
        opplysninger om deg.
      </ConfirmationPanel>
    </>
  );
};

ConfirmationPanelExample.react = `<ConfirmationPanel
checked={checked}
onChange={() => handleConfirm()}
label="Ja, jeg samtykker."
error="Du må bekrefte dette før du kan sende inn søknaden."
>
For å komme videre må du gi oss lov til å hente inn og bruke
opplysninger om deg.
</ConfirmationPanel>`;
