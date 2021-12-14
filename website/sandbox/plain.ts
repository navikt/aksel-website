import { SandboxComponent } from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PlainSandbox: SandboxComponent = (props, variant) => `<Panel>
<BodyLong>Lyst å test en komponent uten å sette oppe et nytt prosjekt? Test de her!
Alle komponenter, ikoner og styling fungerer her</BodyLong>
<Tag size="small" variant="info">
  Tags
</Tag>
<Button >Knapper</Button>
</Panel>`;

export default PlainSandbox;
