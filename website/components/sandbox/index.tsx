import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { DsCodeSandbox as SandboxT } from "../../lib/autogen-types";
import { withErrorBoundary } from "../error-boundary";
import { CanvasIcon, LayoutContext } from "..";
import getSandbox from "../../sandbox";
import { SandboxComponent } from "../../sandbox/types";
import * as DsReact from "@navikt/ds-react";
import * as DsIcons from "@navikt/ds-icons";

import {
  LiveProvider,
  LiveEditor,
  LivePreview,
  LiveError,
  withLive,
} from "react-live";
import { Checkbox, Fieldset, Select, TextField } from "@navikt/ds-react";

const scope = {
  ...DsReact,
  ...DsIcons,
  styled,
};

export const ScTabs = styled.div`
  background-color: var(--navds-semantic-color-canvas-background-light);
  padding: 1px;
  min-height: 50px;

  display: flex;
  justify-content: flex-end;
  border: 1px solid var(--navds-semantic-color-divider);

  ul,
  li {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  svg {
    font-size: 1.5rem;
  }
`;

export const ScPreWrapper = styled.div`
  > pre {
    position: relative;
    background-color: var(--navds-semantic-color-component-background-inverted);
    margin: 0;
    margin-bottom: var(--navds-spacing-7);
  }
`;

export const ScPre = styled.pre`
  > div {
    color: var(--navds-semantic-color-text-inverted);
    max-width: 100%;
    font-family: var(--font-family-code) !important;
  }
`;

export const Code = styled.code`
  color: var(--navds-semantic-color-text-inverted);
  font-size: 1rem;
`;

const ScDiv = styled.div`
  display: flex;
  width: 100%;
  background-color: var(--navds-semantic-color-canvas-background);
  border: 1px solid var(--navds-global-color-gray-200);
  border-top: none;
  overflow-x: auto;
  position: relative;
  min-height: 300px;
`;

const ScInnerDiv = styled.div`
  gap: 1rem;
  padding: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

  &[data-bg="white"] {
    background-color: var(--navds-semantic-color-canvas-background-light);
  }

  &[data-bg="default"] {
    background-color: var(--navds-semantic-color-canvas-background);
  }
  &[data-bg="inverted"] {
    background-color: var(--navds-semantic-color-canvas-background-inverted);
  }
`;

const ScTabButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--navds-semantic-color-text-muted);
  padding: 0.75rem 0.75rem;
  display: flex;
  align-items: center;
  min-width: 50px;
  justify-content: center;

  :hover {
    background-color: var(
      --navds-semantic-color-interaction-primary-hover-subtle
    );
  }

  :focus {
    outline: 2px solid var(--navds-semantic-color-focus);
    outline-offset: -2px;
  }
`;

const ScSettingsPanel = styled.div`
  height: 100%;
  width: 300px;
  max-width: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background-color: var(--navds-semantic-color-canvas-background-light);
  padding: var(--navds-spacing-8);
  overflow-y: auto;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  transform: translateX(100%);
  transition: transform 150ms ease-in-out;
  visibility: hidden;

  &[data-open="true"] {
    transform: translateX(0);
    visibility: visible;
  }
`;

const SettingsPanel = ({ open }: { open: boolean }) => {
  return (
    <ScSettingsPanel data-open={open}>
      <Fieldset legend="Props">
        <TextField label="variant" />
        <Select label="size">
          <option value=""></option>
          <option value="medium">Ikon</option>
          <option value="small">Loader</option>
        </Select>
        <Checkbox>Disabled</Checkbox>
      </Fieldset>
      <Fieldset legend="Varianter">
        <Select label="Velg varianter" hideLabel>
          <option value=""></option>
          <option value="norge">Ikon</option>
          <option value="sverige">Loader</option>
        </Select>
      </Fieldset>
    </ScSettingsPanel>
  );
};

function Live({ live, onEdit }: any) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      {live.error && <pre>{live.error}</pre>}
      <ScTabs>
        <ScTabButton>
          {/* <span className="sr-only">
            Endre bakgrunnsfarge på komponent preview
          </span> */}
          <CanvasIcon />
        </ScTabButton>
        <ScTabButton onClick={() => setSettingsOpen(!settingsOpen)}>
          {/* <span className="sr-only">
            Endre bakgrunnsfarge på komponent preview
          </span> */}
          <DsIcons.SettingsFilled />
        </ScTabButton>
      </ScTabs>
      <ScDiv>
        <ScInnerDiv>
          <LivePreview />
        </ScInnerDiv>
        <SettingsPanel open={settingsOpen} />
      </ScDiv>
      <ScPreWrapper>
        <ScPre>
          <LiveEditor onChange={onEdit} />
        </ScPre>
      </ScPreWrapper>
    </>
  );
}

const LiveComponent = withLive(Live);

const Sandbox = ({ node }: { node: SandboxT }): JSX.Element => {
  /* const layout = useContext(LayoutContext); */

  const [code, setCode] = useState("");

  const sandboxComp: SandboxComponent | null = useMemo(
    () => getSandbox(node?.title),
    [node.title]
  );

  useEffect(() => {
    sandboxComp && setCode(sandboxComp({}));
  }, [sandboxComp]);

  if (!node || !node.title) {
    return null;
  }
  return null;

  return (
    <>
      {code ? (
        <LiveProvider code={code} scope={scope}>
          {/* <button onClick={() => setIsDis(!isDis)}>change</button> */}
          <LiveComponent onEdit={setCode} />
        </LiveProvider>
      ) : null}
    </>
  );
};

const LiveApp = withLive(Sandbox);

export default withErrorBoundary(LiveApp, "Sandbox");
