import React from "react";
import { GuidePanel } from "@navikt/ds-react";
import styled from "styled-components";

export const GuidepanelExample = () => (
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

export const GuidepanelPoster = () => (
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

const GreenWrapper = styled.div`
  --navds-guide-panel-color-border: var(--navds-global-color-green-400);
  --navds-guide-panel-color-illustration-background: var(
    --navds-global-color-green-200
  );
`;

const PurpleWrapper = styled.div`
  --navds-guide-panel-color-border: var(--navds-global-color-purple-400);
  --navds-guide-panel-color-illustration-background: var(
    --navds-global-color-purple-200
  );
`;

export const GuidepanelColors = () => (
  <>
    <GreenWrapper>
      <GuidePanel>
        Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer
        enn X måneder siden du søkte, skal du få brev om at saksbehandlingstiden
        er forlenget.
      </GuidePanel>
    </GreenWrapper>
    <PurpleWrapper>
      <GuidePanel>
        Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer
        enn X måneder siden du søkte, skal du få brev om at saksbehandlingstiden
        er forlenget.
      </GuidePanel>
    </PurpleWrapper>
  </>
);

GuidepanelColors.html = "";
