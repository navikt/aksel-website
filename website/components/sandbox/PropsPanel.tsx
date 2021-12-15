import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useKey } from "react-use";
import styled, { css } from "styled-components";
import { SandboxContext } from ".";
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

const ScSettingsPanel = styled.div<{ open: boolean; inlinePanel: boolean }>`
  height: 100%;
  width: 250px;
  max-width: 100%;

  background-color: var(--navds-semantic-color-canvas-background-light);
  padding: var(--navds-spacing-4);
  overflow-y: auto;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  visibility: hidden;
  border: 1px solid var(--navds-global-color-gray-200);
  position: absolute;
  right: 0;
  top: 0;

  ${(props) =>
    props.open &&
    `border: none;
     border-left: 1px solid var(--navds-global-color-gray-200);`}
  ${(props) =>
    props.inlinePanel
      ? `
     visibility: visible;
     border: none;
     border-left: 1px solid var(--navds-global-color-gray-200);
  `
      : props.open &&
        `
      visibility: visible;
      `}

  :focus {
    outline: none;
  }

  > * {
    gap: 1rem;
    display: flex;
    flex-direction: column;
  }
`;

const SettingsPanel = () => {
  const { sandboxState, setSandboxState } = useContext(SandboxContext);
  const panelRef = useRef<HTMLDivElement>(null);

  useKey(
    "Escape",
    () => setSandboxState({ ...sandboxState, openSettings: false }),
    {},
    []
  );

  useEffect(() => {
    open && panelRef?.current?.focus();
  }, [open]);

  const checkParentWidth = useCallback(() => {
    if (!panelRef.current) return;
    const inlineSettings =
      panelRef.current.parentElement.getBoundingClientRect().width >
      (sandboxState.inlineSettings ? 600 - 250 : 600);

    inlineSettings !== sandboxState.inlineSettings &&
      setSandboxState({
        ...sandboxState,
        inlineSettings,
      });
  }, [sandboxState.inlineSettings]);

  useEffect(() => {
    window.addEventListener("resize", checkParentWidth);
    checkParentWidth();
    return () => {
      window.removeEventListener("resize", checkParentWidth);
    };
  }, [checkParentWidth]);

  return (
    <ScSettingsPanel
      ref={panelRef}
      inlinePanel={sandboxState.inlineSettings && !!sandboxState.args}
      open={sandboxState.openSettings}
      tabIndex={-1}
    >
      <PropFilter />
    </ScSettingsPanel>
  );
};
export default SettingsPanel;
