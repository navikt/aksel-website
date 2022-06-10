import { Panel, Heading, BodyLong } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

(Panel as any).displayName = "Panel";
(Heading as any).displayName = "Heading";
(BodyLong as any).displayName = "BodyLong";

const PanelSandbox: SandboxComponentT = (props: any) => {
  return (
    <Panel border={props?.border}>
      <Heading spacing level="2" size="large">
        Søk om økonomisk sosialhjelp
      </Heading>
      <BodyLong>
        Du kan søke om det du trenger økonomisk støtte til. Det er bare ett
        søknadsskjema, og du beskriver selv hva du vil søke om. NAV-kontoret vil
        gjøre en konkret og individuell vurdering av din søknad. Har du sendt en
        søknad og ønsker å sende dokumentasjon, kan du gjøre dette under dine
        søknader.
      </BodyLong>
    </Panel>
  );
};

PanelSandbox.args = {
  props: {
    border: false,
  },
};

PanelSandbox.getCode = (props: any) => {
  return `<Panel border={${props?.border}}>
  <Heading spacing level="2" size="large">
    Søk om økonomisk sosialhjelp
  </Heading>
  <BodyLong>
    Du kan søke om det du trenger økonomisk støtte til. Det er bare ett
    søknadsskjema, og du beskriver selv hva du vil søke om. NAV-kontoret vil
    gjøre en konkret og individuell vurdering av din søknad. Har du sendt en
    søknad og ønsker å sende dokumentasjon, kan du gjøre dette under dine
    søknader.
  </BodyLong>
</Panel>`;
};

export default PanelSandbox;
