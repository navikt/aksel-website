import React from "react";
import { GuidePanel } from "@navikt/ds-react";
import { ExampleComponent } from "../../lib";

export const GuidepanelExample: ExampleComponent = () => (
  <>
    <GuidePanel>
      Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer
      enn X måneder siden du søkte, skal du få brev om at saksbehandlingstiden
      er forlenget.
    </GuidePanel>
  </>
);

GuidepanelExample.react = `<GuidePanel>
Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer
enn X måneder siden du søkte, skal du få brev om at saksbehandlingstiden
er forlenget.
</GuidePanel>`;

export const GuidepanelPoster: ExampleComponent = () => (
  <>
    <GuidePanel poster>
      Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer
      enn X måneder siden du søkte, skal du få brev om at saksbehandlingstiden
      er forlenget.
    </GuidePanel>
  </>
);

GuidepanelPoster.react = `<GuidePanel poster>
Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer
enn X måneder siden du søkte, skal du få brev om at saksbehandlingstiden
er forlenget.
</GuidePanel>`;

export const GuidepanelColors: ExampleComponent = () => (
  <>
    <div className="stories-sandbox__guidepanel--green">
      <GuidePanel>
        Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer
        enn X måneder siden du søkte, skal du få brev om at saksbehandlingstiden
        er forlenget.
      </GuidePanel>
    </div>
    <div className="stories-sandbox__guidepanel--purple">
      <GuidePanel>
        Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer
        enn X måneder siden du søkte, skal du få brev om at saksbehandlingstiden
        er forlenget.
      </GuidePanel>
    </div>
  </>
);

GuidepanelColors.html = "";
GuidepanelColors.react = "";
