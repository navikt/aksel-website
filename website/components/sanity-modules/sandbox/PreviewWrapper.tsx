import cl from "classnames";
import React, { useContext } from "react";
import { SandboxContext } from "./Sandbox";
import SettingsPanel from "./settings-panel/PropsPanel";

const PreviewWrapper = ({ children }: { children: React.ReactNode }) => {
  const { sandboxState, setSandboxState, setVisibleCode, visibleCode, bg } =
    useContext(SandboxContext);

  return (
    <div
      role="presentation"
      className={cl(
        "relative flex h-full min-h-[300px] w-full rounded-lg border border-solid border-gray-200 bg-[linear-gradient(45deg,_#93a5cf_0%,_#e4efe9_100%)]"
      )}
      style={{
        backgroundColor: bg ? `var(${bg})` : undefined,
        backgroundImage: bg && "none",
      }}
    >
      <div className="sandbox-preview relative inline-flex w-full flex-wrap items-center justify-center gap-4 overflow-x-auto p-4 pt-8 lg:p-8 lg:pt-12">
        {children}
        <div className="absolute top-3 right-4 flex gap-4">
          <button
            className=" rounded bg-gray-800/10 py-1 px-3 text-medium hover:bg-blue-50/50 focus:shadow-focus focus:outline-none"
            onClick={() => setVisibleCode(!visibleCode)}
          >
            {visibleCode ? "Skjul kode" : "Vis kode"}
          </button>
          <button
            className={cl(
              "rounded bg-gray-800/10 py-1 px-3 text-medium hover:bg-blue-50/50 focus:shadow-focus focus:outline-none",
              { hidden: sandboxState.openSettings }
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
