import React from "react";
import { HelpText } from "@navikt/ds-react";

export const HelpTextExample = () => (
  <>
    <HelpText title="Hvor kommer dette fra?">
      Informasjonen er hentet fra X sin statistikk fra 2021
    </HelpText>
  </>
);

HelpTextExample.react = `<HelpText title="Hvor kommer dette fra?">
Informasjonen er hentet fra X sin statistikk fra 2021
</HelpText>`;
