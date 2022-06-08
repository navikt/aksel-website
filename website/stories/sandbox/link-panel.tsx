import { LinkPanel } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

(LinkPanel as any).displayName = "LinkPanel";
(LinkPanel.Title as any).displayName = "LinkPanel.Title";
(LinkPanel.Description as any).displayName = "LinkPanel.Description";

const LinkPanelSandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    ...(props?.headingTag ? { headingTag: props.headingTag } : {}),
  };

  return (
    <LinkPanel href="#" border={props?.border} {...newProps}>
      <LinkPanel.Title>Arbeidssøker eller permittert</LinkPanel.Title>
      {props?.description && (
        <LinkPanel.Description>
          Om jobb, registrering, CV, dagpenger og feriepenger av dagpenger
        </LinkPanel.Description>
      )}
    </LinkPanel>
  );
};

LinkPanelSandbox.args = {
  props: {
    description: false,
    border: true,
  },
};

export default LinkPanelSandbox;
