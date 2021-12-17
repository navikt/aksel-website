import ReactDOMServer from "react-dom/server";
import { BodyLong, Heading, Panel, Tag } from "@navikt/ds-react";
import { SandboxComponent } from "./types";

const Plain = () => (
  <Panel>
    <Heading spacing level="3" size="medium">
      Sandkassen
    </Heading>
    <BodyLong as="span">
      Lyst å test en komponent uten å sette opp et nyt prosjekt? Test de her!
    </BodyLong>
    <BodyLong spacing>
      Alle komponenter, ikoner og css-klasser fungerer her 🎉
    </BodyLong>
    <Tag size="small" variant="info">
      Demo
    </Tag>
  </Panel>
);

const PlainSandbox: SandboxComponent = () =>
  ReactDOMServer.renderToString(<Plain />);

export default PlainSandbox;
