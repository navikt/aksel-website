import { Add, Minus, Refresh, SettingsFilled } from "@navikt/ds-icons";
import { Label } from "@navikt/ds-react";
import React, { useContext } from "react";
import styled from "styled-components";
import { SandboxContext } from "./Sandbox";
import ColorPicker from "./ColorPicker";
import { ScTabCss } from "./PropsPanel";

const ScTabs = styled.div`
  background-color: var(--navds-semantic-color-canvas-background-light);
  padding: 1px;
  min-height: 50px;

  display: flex;
  justify-content: space-between;
  border: 1px solid var(--navds-semantic-color-divider);
  align-items: center;
  overflow-x: auto;

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

export const ScTabButton = styled.button`
  ${ScTabCss}

  :hover,
  :hover:focus {
    cursor: pointer;
    color: var(--navds-semantic-color-text);
  }
`;

const ScLabel = styled(Label)`
  padding: 0 1rem;
`;

const ScFlex = styled.div`
  display: flex;
`;

const Tabs = ({ reset }: { reset: () => void }) => {
  const { sandboxState, setSandboxState, bg, setBg } =
    useContext(SandboxContext);

  const hideProps =
    !sandboxState.args ||
    ((!sandboxState.args.props ||
      Object.keys(sandboxState.args.props).length === 0) &&
      !sandboxState.args.variants);

  return (
    <ScTabs>
      <ScLabel>Sandkasse</ScLabel>
      <ScFlex>
        <ColorPicker defaultColor={bg} onChange={(c) => setBg(c)} />
        <ScTabButton onClick={() => reset()}>
          <span className="sr-only">Reset sandbox</span>
          <Refresh aria-hidden aria-label="reset sandkasse visning" />
        </ScTabButton>
        <ScTabButton
          onClick={() =>
            setSandboxState({
              ...sandboxState,
              fullscreen: !sandboxState.fullscreen,
            })
          }
        >
          <span className="navds-sr-only">
            {sandboxState.fullscreen
              ? "Lukk fullskjerm"
              : "Åpne sandbox i fullskjerm"}
          </span>
          {sandboxState.fullscreen ? (
            <Minus aria-hidden />
          ) : (
            <Add aria-hidden />
          )}
        </ScTabButton>
        {!hideProps && !sandboxState.inlineSettings && (
          <ScTabButton
            onClick={() =>
              setSandboxState({
                ...sandboxState,
                openSettings: !sandboxState.openSettings,
              })
            }
          >
            <span className="sr-only">Åpne props-panel</span>
            <SettingsFilled />
          </ScTabButton>
        )}
      </ScFlex>
    </ScTabs>
  );
};

export default Tabs;
