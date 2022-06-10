import { GuidePanel } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

GuidePanel.displayName = "GuidePanel";

const GuidePanelSandbox: SandboxComponentT = (props: any) => {
  return (
    <GuidePanel poster={props?.poster} className="max-w-2xl">
      Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer
      enn X måneder siden du søkte, skal du få brev om at saksbehandlingstiden
      er forlenget.
    </GuidePanel>
  );
};

GuidePanelSandbox.args = {
  props: {
    poster: false,
  },
};

GuidePanelSandbox.getCode = (props: any) => {
  return `<GuidePanel${props?.poster ? " poster" : ""}>
  Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer
  enn X måneder siden du søkte, skal du få brev om at saksbehandlingstiden
  er forlenget.
</GuidePanel>`;
};

export default GuidePanelSandbox;
