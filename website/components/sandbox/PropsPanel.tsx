import { Close } from "@navikt/ds-icons";
import { Checkbox, Fieldset, Select } from "@navikt/ds-react";
import React from "react";
import styled, { css } from "styled-components";

export const ScTabCss = css`
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

const ScCloseButton = styled.button`
  ${ScTabCss}
  position: absolute;
  top: 0;
  right: 0;

  svg {
    font-size: 1.5rem;
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
  transition: transform 0ms ease-in-out;
  visibility: hidden;
  border: 1px solid var(--navds-global-color-gray-200);

  &[data-open="true"] {
    transform: translateX(0);
    visibility: visible;
  }
`;

const SettingsPanel = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (boolean) => void;
}) => {
  return (
    <ScSettingsPanel data-open={open}>
      <ScCloseButton onClick={() => setOpen(false)}>
        <Close aria-hidden />
        <span className="sr-only">Lukk props panel for kode sandbox</span>
      </ScCloseButton>
      <Fieldset legend="Props" size="small">
        <Select label="variant">
          <option value=""></option>
          <option value="medium">Primary</option>
          <option value="medium">Secondary</option>
          <option value="medium">Tertiary</option>
          <option value="medium">Danger</option>
        </Select>
        <Select label="size">
          <option value=""></option>
          <option value="medium">Ikon</option>
          <option value="small">Loader</option>
        </Select>
        <Checkbox>Disabled</Checkbox>
      </Fieldset>
      <Fieldset legend="Varianter" size="small">
        <Select label="Velg varianter" hideLabel>
          <option value=""></option>
          <option value="norge">Ikon</option>
          <option value="sverige">Loader</option>
        </Select>
      </Fieldset>
    </ScSettingsPanel>
  );
};
export default SettingsPanel;
