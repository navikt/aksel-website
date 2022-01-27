import * as Icons from "@navikt/ds-icons";
import meta from "@navikt/ds-icons/meta.json";
import { BodyShort, Button, Detail, Heading } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import styled, { css } from "styled-components";
import { isNew } from ".";
import { AmplitudeEvents, Snippet, useAmplitude } from "../..";
import { CodeSnippet } from "../../../lib";
import { downloadPng, downloadSvg } from "./downloads";

const ScModalContent = styled.div`
  min-width: 300px;
  max-width: 600px;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
`;

const ScMutedBodyShort = styled(BodyShort)`
  color: var(--navds-semantic-color-text-muted);
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
  background-color: var(--navds-semantic-color-canvas-background-light);
  color: var(--navds-semantic-color-text);
`;

const ScIconInverted = styled.div`
  ${ScIconCss}
  background-color: var(--navds-semantic-color-canvas-background-inverted);
  color: var(--navds-semantic-color-text-inverted);
`;

const ScButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;

  margin-bottom: 2rem;
`;

const ScNew = styled(Detail)`
  padding: 0.25rem 0.5rem;
  background-color: var(--navds-semantic-color-feedback-info-background);
  border-radius: 4px;
  height: 100%;
`;

const ScHeading = styled(Heading)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ScTopWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  margin-right: 4rem;
  gap: 1rem;

  @media (max-width: 564px) {
    flex-direction: column;
  }

  /* > * {
    flex: 1 1;
  } */
`;

const ModalContent = ({ icon }: { icon: string }) => {
  const { logAmplitudeEvent } = useAmplitude();

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

  const logDownload = (icon, format) => {
    logAmplitudeEvent(AmplitudeEvents.ikonnedlastning, {
      icon,
      format,
    });
  };

  const importSnippet: CodeSnippet = {
    _type: "code_snippet",
    title: `Install-snippet for ${icon} icon`,
    code: {
      language: "jsx",
      code: `// React
import { ${icon} } from "@navikt/ds-icons";

// SVG
import ${icon} from "@navikt/ds-icons/svg/${icon}";`,
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
      <ScTopWrapper>
        <div>
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
        </div>
        <div>
          <Heading spacing level="3" size="medium">
            Last ned
          </Heading>
          <ScButtonWrapper>
            <Button
              variant="tertiary"
              onClick={() => {
                downloadSvg(icon);
                logDownload(icon, "svg");
              }}
            >
              <Icons.Download aria-label="last ned" /> SVG
            </Button>
            <Button
              variant="tertiary"
              onClick={() => {
                downloadPng(icon);
                logDownload(icon, "png");
              }}
            >
              <Icons.Download aria-label="last ned" />
              PNG
            </Button>
          </ScButtonWrapper>
        </div>
      </ScTopWrapper>
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
