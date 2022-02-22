import cl from "classnames";
import React, { useContext } from "react";
import { SandboxContext } from "./Sandbox";
import SettingsPanel from "./settings-panel/PropsPanel";

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
        "relative flex h-full min-h-[300px] w-full rounded-lg border border-solid border-gray-800/10 bg-origin-border shadow-md",
        /* "bg-[linear-gradient(-45deg,_#d8f9ff_20%,_#f9fccc_100%)]" */
        "bg-[linear-gradient(-45deg,_#f1f1f1_0%,_white_100%)]"
      )}
      style={{
        backgroundColor: bg ? `var(${bg})` : undefined,
        backgroundImage: bg && "none",
      }}
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
            className=" rounded bg-gray-800/10 py-1 px-3 text-medium hover:bg-gray-800/20 focus:shadow-focus focus:outline-none"
            onClick={() => setVisibleCode(!visibleCode)}
          >
            {visibleCode ? "Skjul kode" : "Vis kode"}
          </button>
          <button
            className={cl(
              "rounded bg-gray-800/10 py-1 px-3 text-medium hover:bg-gray-800/20 focus:shadow-focus focus:outline-none",
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
