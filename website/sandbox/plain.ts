import { SandboxComponent } from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PlainSandbox: SandboxComponent = (props, variant) => `<Panel>
<Heading spacing level="3" size="medium">Sandkassen</Heading>
<BodyLong as="span">Lyst å test en komponent uten å sette opp et nyt prosjekt? Test de her!</BodyLong>
<BodyLong spacing>Alle komponenter, ikoner og css-klasser fungerer her 🎉</BodyLong>
<Tag size="small" variant="info">
Demo
</Tag>
</Panel>`;

export default PlainSandbox;
