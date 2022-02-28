import cl from "classnames";
import React, { useContext } from "react";

import { BgColors, getBgColors } from "../../../stories/sandbox/types";
import { SandboxContext } from "./Sandbox";
import SettingsPanel from "./settings-panel/PropsPanel";

const buttonStyles = (bg?: BgColors) => {
  const light = "bg-gray-800/10 hover:bg-gray-800/20 focus:shadow-focus";
  const dark =
    "bg-gray-100/10 hover:bg-gray-100/20 focus:shadow-focus-inverted text-text-inverted";
  if (!bg) return light;
  if ([BgColors.DEFAULT, BgColors.GRADIENT, BgColors.WHITE].includes(bg)) {
    return light;
  } else return dark;
};

const PreviewWrapper = ({ children }: { children: React.ReactNode }) => {
  const { sandboxState, setSandboxState, setVisibleCode, visibleCode, bg } =
    useContext(SandboxContext);

  const hideProps =
    !sandboxState.args ||
    !sandboxState.args.props ||
    Object.keys(sandboxState.args.props).length === 0;

  return (
    <div
      role="presentation"
      className={cl(
        "relative flex h-full min-h-[300px] w-full rounded-lg border border-solid border-gray-800/10 bg-origin-border"
      )}
      style={getBgColors(bg)}
    >
      <div
        className={cl(
          "sandbox-preview relative w-full flex-wrap items-center justify-center gap-4 overflow-x-auto p-4 pt-8 lg:p-8 lg:pt-12",
          {
            "hidden lg:inline-flex": sandboxState.openSettings,
            "inline-flex": !sandboxState.openSettings,
          }
        )}
      >
        {children}
        <div className="absolute top-3 right-4 flex gap-4">
          <button
            className={cl(
              buttonStyles(bg),
              "rounded py-1 px-3 text-medium focus:outline-none"
            )}
            onClick={() => setVisibleCode(!visibleCode)}
          >
            {visibleCode ? "Skjul kode" : "Vis kode"}
          </button>
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

export default PreviewWrapper;
