import cl from "classnames";
import React, { useContext } from "react";
import { getBgColors } from "../../../stories/sandbox/types";
import { SandboxContext } from "./index";
import SettingsPanel from "./settings-panel/PropsPanel";

export const Preview = ({ children }: { children: React.ReactElement }) => {
  const { bg, sandboxState } = useContext(SandboxContext);

  const hideProps =
    !sandboxState.args ||
    !sandboxState.args.props ||
    Object.keys(sandboxState.args.props).length === 0;

  return (
    <div
      role="presentation"
      className={cl("relative flex h-full w-full flex-col rounded lg:flex-row")}
    >
      <div
        className={cl(
          "flex min-h-[300px] w-full justify-center bg-gray-100 p-3",
          { "lg:pr-0": !hideProps }
        )}
      >
        <div
          style={getBgColors(bg)}
          className="relative inline-flex w-full flex-wrap items-center justify-center gap-4 overflow-x-auto p-4 pt-8 md:p-8 md:pt-12"
        >
          <div className="inline-flex w-full flex-wrap items-center justify-center gap-4">
            {children}
          </div>
        </div>
      </div>
      <SettingsPanel />
    </div>
  );
};
