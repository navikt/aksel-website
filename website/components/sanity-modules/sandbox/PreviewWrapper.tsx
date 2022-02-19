import cl from "classnames";
import React, { useContext } from "react";
import { SandboxContext } from "./Sandbox";
import SettingsPanel from "./settings-panel/PropsPanel";

const PreviewWrapper = ({ children }: { children: React.ReactNode }) => {
  const { sandboxState, setSandboxState, bg, setBg } =
    useContext(SandboxContext);

  const hideProps =
    !sandboxState.args ||
    ((!sandboxState.args.props ||
      Object.keys(sandboxState.args.props).length === 0) &&
      !sandboxState.args.variants);

  const showSettings = !hideProps;

  return (
    <div
      role="presentation"
      className="relative flex h-full min-h-[300px] w-full rounded-lg border border-solid border-gray-200 bg-[linear-gradient(130deg,_#69b7eb,_#b3dbd3,_#f4d6db);]"
    >
      <div className="sandbox-preview relative inline-flex w-full flex-wrap items-center justify-center gap-4 overflow-x-auto p-4 lg:p-8">
        {children}
        <div className="absolute top-3 right-4 flex gap-4">
          <button className=" rounded bg-gray-800/10 py-1 px-3 text-medium hover:bg-blue-50/50 focus:shadow-focus focus:outline-none">
            Vis kode
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
