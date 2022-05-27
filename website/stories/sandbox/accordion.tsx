import { stringifyJsx } from "@/utils";
import { Accordion } from "@navikt/ds-react";
import { SandboxComponent } from "./types";

Accordion.displayName = "Accordion";
Accordion.Item.displayName = "Accordion.Item";
Accordion.Header.displayName = "Accordion.Header";
Accordion.Content.displayName = "Accordion.Content";
const Comp = () => (
  <Accordion className="w-full">
    <Accordion.Item>
      <Accordion.Header>Til deg som er mellom 62 og 67 år</Accordion.Header>
      <Accordion.Content>
        Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha hatt
        en pensjonsgivende inntekt som tilsvarer x G, året før du fikk nedsatt
        arbeidsevnen. NAV kan gjøre unntak.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Header>
        Til deg som har yrkesskade eller yrkessykdom
      </Accordion.Header>
      <Accordion.Content>
        Med yrkesskade mener vi at du har fått en skade som følge av en
        arbeidsulykke. Vi kan godkjenne en sykdom som yrkessykdom hvis den
        kommer av skadelig påvirkning fra arbeidsmiljøet.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
);

const AccordionSandbox: SandboxComponent = () => {
  return stringifyJsx(Comp());
  return `<div>123</div>`;
};

export default AccordionSandbox;
