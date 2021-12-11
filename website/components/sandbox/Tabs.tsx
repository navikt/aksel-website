import { Refresh, SettingsFilled } from "@navikt/ds-icons";
import { Label } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";
import { CanvasIcon } from "..";
import { ScTabCss } from "./PropsPanel";

const ScTabs = styled.div`
  background-color: var(--navds-semantic-color-canvas-background-light);
  padding: 1px;
  min-height: 50px;

  display: flex;
  justify-content: space-between;
  border: 1px solid var(--navds-semantic-color-divider);
  align-items: center;

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

const ScTabButton = styled.button`
  ${ScTabCss}
`;

const ScLabel = styled(Label)`
  padding: 0 1rem;
`;

const ScFlex = styled.div`
  display: flex;
`;

const Tabs = ({
  openPanel,
  reset,
}: {
  openPanel: () => void;
  reset: () => void;
}) => {
  return (
    <ScTabs>
      <ScLabel>Sandbox</ScLabel>
      <ScFlex>
        <ScTabButton onClick={() => reset()}>
          <span className="sr-only">Reset sandbox</span>
          <Refresh />
        </ScTabButton>
        {/* <ScTabButton>
          <span className="sr-only">
            Endre bakgrunnsfarge på komponent sanbox
          </span>
          <CanvasIcon />
        </ScTabButton> */}
        <ScTabButton onClick={() => openPanel()}>
          <span className="sr-only">Åpne props-panel</span>
          <SettingsFilled />
        </ScTabButton>
      </ScFlex>
    </ScTabs>
  );
};

export default Tabs;
