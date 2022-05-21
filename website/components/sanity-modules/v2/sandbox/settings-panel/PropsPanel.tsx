import { Close } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import cl from "classnames";
import React, { useContext, useEffect, useRef } from "react";
import { useKey } from "react-use";
import { SandboxContext } from "../Sandbox";
import PropFilter from "./PropFilter";

const SettingsPanel = () => {
  const { sandboxState, setSandboxState, reset } = useContext(SandboxContext);
  const panelRef = useRef<HTMLDivElement>(null);

  useKey(
    "Escape",
    () =>
      sandboxState.openSettings &&
      setSandboxState({ ...sandboxState, openSettings: false }),
    {},
    [sandboxState.openSettings]
  );

  useEffect(() => {
    sandboxState.openSettings && panelRef?.current?.focus();
  }, [sandboxState?.openSettings]);

  const hideProps =
    !sandboxState.args ||
    !sandboxState.args.props ||
    Object.keys(sandboxState.args.props).length === 0;

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      className={cl(
        "flex w-full flex-col items-center gap-4 overflow-y-auto rounded-r border-l border-gray-200 bg-canvas-background-light p-4 focus:outline-none",
        "md:relative md:max-w-[250px]",
        "absolute inset-0 animate-fadeIn",
        {
          hidden: !sandboxState.openSettings || hideProps,
        }
      )}
    >
      <div className="flex h-full flex-col">
        <button
          className="absolute top-0 right-0 p-4 text-xlarge hover:bg-interaction-primary-hover-subtle focus:shadow-focus-inset focus:outline-none"
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
        <PropFilter />
        <Button
          variant="tertiary"
          onClick={reset}
          size="small"
          className="mx-auto mt-auto w-fit justify-self-end"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
export default SettingsPanel;
