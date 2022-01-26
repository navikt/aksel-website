import React from "react";
import { HelpText } from "@navikt/ds-react";
import { ExampleComponent } from "../../lib";

export const HelpTextExample: ExampleComponent = () => (
  <div className="mt-12 mx-4">
    <HelpText title="Hvor kommer dette fra?">
      Informasjonen er hentet fra X sin statistikk fra 2021.
    </HelpText>
  </div>
);

HelpTextExample.html = "";
HelpTextExample.react = `<HelpText title="Hvor kommer dette fra?">
Informasjonen er hentet fra X sin statistikk fra 2021
</HelpText>`;
