import { Close, Refresh } from "@navikt/ds-icons";
import { Button, Heading } from "@navikt/ds-react";
import cl from "classnames";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useKey } from "react-use";
import PropFilter from "./PropFilter";
import { SandboxContext } from "../Sandbox";

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
    <div
      ref={panelRef}
      tabIndex={-1}
      className={cl(
        "w-[220px] min-w-[220px] bg-canvas-background-light p-4 overflow-y-auto gap-4 flex-col focus:outline-none border-l border-gray-200",
        {
          "h-full": !sandboxState.inlineSettings,
          "flex relative": sandboxState.inlineSettings && !!sandboxState.args,
          hidden:
            !sandboxState.openSettings &&
            !(sandboxState.inlineSettings && !!sandboxState.args),
          "flex absolute right-0 top-0":
            sandboxState.openSettings &&
            !(sandboxState.inlineSettings && !!sandboxState.args),
        }
      )}
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
        className="w-fit mx-auto mt-auto"
      >
        Reset
        <Refresh aria-hidden aria-label="reset sandkasse visning" />
      </Button>
    </div>
  );
};
export default SettingsPanel;
