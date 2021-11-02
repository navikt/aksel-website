import * as Icons from "@navikt/ds-icons";
import meta from "@navikt/ds-icons/meta.json";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import styled, { css } from "styled-components";
import { isNew } from ".";
import { Snippet } from "..";
import { CodeSnippet } from "../../lib/autogen-types";
import { ScButton } from "./DownloadButtons";
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

const ScNew = styled(Detail)`
  padding: 0.25rem 0.5rem;
  background-color: var(--navds-color-lightblue-10);
  border-radius: 4px;
  height: 100%;
`;

const ScHeading = styled(Heading)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ModalContent = ({ icon }: { icon: string }) => {
  const [doc, setDoc] = useState<{
    name: string;
    pageName: string;
    description: string;
    created_at: string;
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
      <ScHeading spacing level="2" size="medium">
        {icon}
        {isNew(doc?.created_at) && <ScNew forwardedAs="span">Ny!</ScNew>}
      </ScHeading>
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
        <ScButton onClick={() => downloadSvg(icon)}>
          <Icons.Download aria-label="last ned" /> SVG
        </ScButton>
        <ScButton onClick={() => downloadPng(icon)}>
          <Icons.Download aria-label="last ned" />
          PNG
        </ScButton>
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
