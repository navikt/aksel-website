import { Button } from "@navikt/ds-react";
import cl from "classnames";
import React, { useContext } from "react";
import { SandboxContext } from "../index";
import PropFilter from "./PropFilter";

const SettingsPanel = () => {
  const { sandboxState, reset } = useContext(SandboxContext);

  const hideProps =
    !sandboxState.args ||
    !sandboxState.args.props ||
    Object.keys(sandboxState.args.props).length === 0;

  return (
    <div
      className={cl(
        "flex w-full flex-col items-center gap-4 overflow-y-auto rounded-r bg-gray-100 px-6 py-4",
        "animate-fadeIn lg:max-w-[250px]",
        {
          hidden: hideProps,
        }
      )}
    >
      <div className="flex h-full w-full max-w-[250px] flex-col">
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
