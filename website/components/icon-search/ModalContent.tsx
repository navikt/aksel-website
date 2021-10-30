import { BodyShort, Button, Heading } from "@navikt/ds-react";
import styled, { css } from "styled-components";
import meta from "@navikt/ds-icons/meta.json";
import React, { useEffect, useState } from "react";
import * as Icons from "@navikt/ds-icons";
import { Snippet } from "..";
import { CodeSnippet } from "../../lib/autogen-types";
import { renderToString } from "react-dom/server";
import { downloadPng, downloadSvg } from "./downloads";

const ScModalContent = styled.div`
  min-width: 300px;
  max-width: 600px;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
`;

const ScMutedBodyShort = styled(BodyShort)`
  color: var(--navds-color-gray-60);
`;

const ScIcons = styled.div`
  display: flex;
  margin-top: auto;
`;

const ScIconCss = css`
  flex: 1 1;

  /* Helps avoid un-needed scroll */
  max-height: 180px;
  min-height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
`;

const ScIcon = styled.div`
  ${ScIconCss}
  background-color: white;
  color: var(--navds-color-gray-90);
`;

const ScIconInverted = styled.div`
  ${ScIconCss}
  background-color: var(--navds-color-gray-90);
  color: white;
`;

const ScButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const ModalContent = ({ icon }: { icon: string }) => {
  const [doc, setDoc] = useState<{
    name: string;
    pageName: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    const doc = meta.find((x) => x.name === icon);
    setDoc(doc ?? null);
  }, [icon]);

  const importSnippet: CodeSnippet = {
    _type: "code_snippet",
    title: `Install-snippet for ${icon} icon`,
    code: {
      language: "jsx",
      code: `// React ESM
import { ${icon} } from "@navikt/ds-icons";

// SVG
import Icon from "@navikt/ds-icons/svg/${icon}";`,
    },
  };

  const Icon = Icons[icon];

  const svgSnippet: CodeSnippet = {
    _type: "code_snippet",
    title: `Svg-snippet for ${icon} icon`,
    code: {
      language: "jsx",
      code: `${renderToString(<Icon />)}`,
    },
  };

  return (
    <ScModalContent>
      <Heading spacing level="2" size="medium">
        {icon}
      </Heading>
      {doc && (
        <>
          <ScMutedBodyShort>{doc.pageName}</ScMutedBodyShort>
          <ScMutedBodyShort spacing>{`${
            doc.description && `${doc.description}`
          }`}</ScMutedBodyShort>
        </>
      )}
      <Heading spacing level="3" size="small">
        Last ned
      </Heading>
      <ScButtonWrapper>
        <Button onClick={() => downloadSvg(icon)}>
          <Icons.Download aria-label="last ned" /> SVG
        </Button>
        <Button onClick={() => downloadPng(icon)}>
          <Icons.Download aria-label="last ned" />
          PNG
        </Button>
      </ScButtonWrapper>
      <Heading spacing level="3" size="small">
        Import
      </Heading>
      <Snippet node={importSnippet} />
      <Heading spacing level="3" size="small">
        Svg
      </Heading>
      <Snippet node={svgSnippet} />
      <ScIcons>
        <ScIcon>
          <Icon />
        </ScIcon>
        <ScIconInverted>
          <Icon />
        </ScIconInverted>
      </ScIcons>
    </ScModalContent>
  );
};

export default ModalContent;
