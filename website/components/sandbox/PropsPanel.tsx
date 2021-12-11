import { Close } from "@navikt/ds-icons";
import React, { useCallback, useEffect, useRef } from "react";
import { useClickAway, useEvent, useKey } from "react-use";
import styled, { css } from "styled-components";
import PropFilter from "./PropFilter";

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
  gap: 2rem;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0ms ease-in-out;
  visibility: hidden;
  border: 1px solid var(--navds-global-color-gray-200);

  :focus {
    outline: none;
  }

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
  const panelRef = useRef<HTMLDivElement>(null);

  useKey("Escape", () => setOpen(false), {}, []);
  useClickAway(panelRef, () => open && setOpen(false));

  const onFocusChange = useCallback(() => {
    !panelRef.current.contains(document.activeElement) && setOpen(false);
  }, []);

  useEvent("focusin", onFocusChange);

  useEffect(() => {
    open && panelRef?.current?.focus();
  }, [open]);

  return (
    <ScSettingsPanel ref={panelRef} data-open={open} tabIndex={-1}>
      <ScCloseButton onClick={() => setOpen(false)}>
        <Close aria-hidden />
        <span className="sr-only">Lukk props panel for kode sandbox</span>
      </ScCloseButton>
      <PropFilter />
    </ScSettingsPanel>
  );
};
export default SettingsPanel;
