import { LinkPanel } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

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

LinkPanelSandbox.getCode = (props: any) => {
  return `<LinkPanel
  href="#"${props?.border ? "\n  border" : ""}
>
  <LinkPanel.Title>Arbeidssøker eller permittert</LinkPanel.Title>${
    props?.description
      ? `\n  <LinkPanel.Description>
    Om jobb, registrering, CV, dagpenger og feriepenger av dagpenger
  </LinkPanel.Description>`
      : ""
  }
</LinkPanel>`;
};

export default LinkPanelSandbox;
