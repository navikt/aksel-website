import { Close, Refresh } from "@navikt/ds-icons";
import { Button, Heading } from "@navikt/ds-react";
import cl from "classnames";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useKey } from "react-use";
import styled from "styled-components";
import PropFilter from "./PropFilter";
import { SandboxContext } from "./Sandbox";

const ScSettingsPanel = styled.div<{ open: boolean; inlinePanel: boolean }>`
  width: 220px;
  min-width: 220px;
  background-color: var(--navds-semantic-color-canvas-background-light);
  padding: var(--navds-spacing-4);
  overflow-y: auto;
  gap: 1rem;
  flex-direction: column;
  display: none;
  border: 1px solid var(--navds-global-color-gray-200);
  right: 0;
  top: 0;
  border-bottom-right-radius: 0.25rem;

  ${(props) =>
    props.open &&
    `border: none;
     border-left: 1px solid var(--navds-global-color-gray-200);
     display: flex;
     position: absolute;
     `}
  ${(props) =>
    props.inlinePanel &&
    `
     display: flex;
     border: none;
     border-left: 1px solid var(--navds-global-color-gray-200);
     position: relative;
  `}

  :focus {
    outline: none;
  }

  > * > .navds-switch:not(.navds-switch ~ .navds-switch) {
    margin-top: 1rem;
  }
`;

const SettingsPanel = () => {
  const { sandboxState, setSandboxState, reset } = useContext(SandboxContext);
  const panelRef = useRef<HTMLDivElement>(null);

  useKey(
    "Escape",
    () =>
      !sandboxState.inlineSettings &&
      sandboxState.openSettings &&
      setSandboxState({ ...sandboxState, openSettings: false }),
    {},
    [sandboxState.inlineSettings, sandboxState.openSettings]
  );

  useEffect(() => {
    sandboxState.openSettings && panelRef?.current?.focus();
  }, [sandboxState?.openSettings]);

  const checkParentWidth = useCallback(() => {
    if (!panelRef.current) return;
    const inlineSettings =
      panelRef.current.parentElement.getBoundingClientRect().width > 600;

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

  const hideProps =
    !sandboxState.args ||
    ((!sandboxState.args.props ||
      Object.keys(sandboxState.args.props).length === 0) &&
      !sandboxState.args.variants);

  return (
    <ScSettingsPanel
      ref={panelRef}
      inlinePanel={sandboxState.inlineSettings && !!sandboxState.args}
      open={sandboxState.openSettings}
      tabIndex={-1}
      className={cl({ "h-full": !sandboxState.inlineSettings })}
    >
      <Heading as="div" size="xsmall">
        Props
      </Heading>
      {!hideProps && !sandboxState.inlineSettings && (
        <button
          className="absolute top-0 right-0 p-4 text-xlarge focus:shadow-focus-inset focus:outline-none hover:bg-interaction-primary-hover-subtle"
          onClick={() =>
            setSandboxState({
              ...sandboxState,
              openSettings: !sandboxState.openSettings,
            })
          }
        >
          <span className="sr-only">Lukk props-panel</span>
          <Close aria-hidden />
        </button>
      )}
      <PropFilter />
      <Button
        variant="tertiary"
        onClick={reset}
        size="small"
        className="w-fit mx-auto"
      >
        Reset
        <Refresh aria-hidden aria-label="reset sandkasse visning" />
      </Button>
    </ScSettingsPanel>
  );
};
export default SettingsPanel;
