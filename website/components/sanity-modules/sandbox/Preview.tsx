import React, { useContext } from "react";
import SettingsPanel from "./settings-panel/PropsPanel";

import cl from "classnames";
import { BgColors } from "@/lib";
import { getBgColors } from "../../../stories/sandbox/types";
import { SandboxContext } from "./index";

const buttonStyles = (bg?: BgColors) => {
  const light = "bg-gray-800/10 hover:bg-gray-800/20 focus:shadow-focus";
  const dark =
    "bg-gray-100/10 hover:bg-gray-100/20 focus:shadow-focus-inverted text-text-inverted";
  if (!bg) return light;
  if ([BgColors.DEFAULT, BgColors.GRADIENT, BgColors.WHITE].includes(bg)) {
    return light;
  } else return dark;
};

export const Preview = ({ children }: { children: React.ReactElement }) => {
  const { sandboxState, setSandboxState, bg } = useContext(SandboxContext);

  const hideProps =
    !sandboxState.args ||
    !sandboxState.args.props ||
    Object.keys(sandboxState.args.props).length === 0;

  return (
    <div
      role="presentation"
      className={cl(
        "relative flex h-full min-h-[300px] w-full rounded border border-solid border-gray-800/10 bg-origin-border"
      )}
      style={getBgColors(bg)}
    >
      <div
        className={cl(
          "relative inline-flex w-full flex-wrap items-center justify-center gap-4 overflow-x-auto p-4 pt-8 md:p-8 md:pt-12",
          {
            "hidden md:inline-flex": sandboxState.openSettings,
            "inline-flex": !sandboxState.openSettings,
          }
        )}
      >
        <div className="inline-flex w-full flex-wrap items-center justify-center gap-4">
          {children}
        </div>
        <div className="absolute top-3 right-4 flex gap-4">
          <button
            className={cl(
              buttonStyles(bg),
              "rounded py-1 px-3 text-medium focus:outline-none",
              { hidden: sandboxState.openSettings || hideProps }
            )}
            onClick={() =>
              setSandboxState({
                ...sandboxState,
                openSettings: !sandboxState.openSettings,
              })
            }
          >
            Vis props
          </button>
        </div>
      </div>
      <SettingsPanel />
    </div>
  );
};