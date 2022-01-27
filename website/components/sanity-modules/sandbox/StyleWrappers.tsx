import { Settings } from "@navikt/ds-icons";
import React, { useContext } from "react";
import ColorPicker from "./ColorPicker";
import SettingsPanel from "./PropsPanel";
import { SandboxContext } from "./Sandbox";
import cl from "classnames";

export const PreviewWrapper = ({ children }: { children: React.ReactNode }) => {
  const { sandboxState, setSandboxState, bg, setBg } =
    useContext(SandboxContext);

  const hideProps =
    !sandboxState.args ||
    ((!sandboxState.args.props ||
      Object.keys(sandboxState.args.props).length === 0) &&
      !sandboxState.args.variants);

  const showSettings = !hideProps && !sandboxState.inlineSettings;

  const background = bg.startsWith("--") ? `var(${bg})` : `${bg}`;

  return (
    <div
      className="flex w-full border-gray-200 border border-solid relative min-h-[400px] h-full rounded"
      style={{ backgroundColor: background }}
    >
      <div className="sandbox-preview relative gap-4 p-4 lg:p-8 inline-flex items-center justify-center flex-wrap w-full overflow-x-auto">
        {children}
        <ColorPicker
          defaultColor={bg}
          onChange={(c) => setBg(c)}
          className={cl(
            "absolute top-0 p-3 text-xlarge focus:shadow-focus-inset focus:outline-none hover:bg-none",
            { "right-0": !showSettings, "right-12": showSettings }
          )}
          style={{
            color: `var(${bg})`,
            display: sandboxState.openSettings ? "none" : "inherit",
          }}
          sandbox
        />
        {showSettings && (
          <button
            className="absolute top-0 right-0 p-3 text-xlarge focus:shadow-focus-inset focus:outline-none"
            style={{
              color: `var(${bg})`,
              display: sandboxState.openSettings ? "none" : "inherit",
            }}
            onClick={() =>
              setSandboxState({
                ...sandboxState,
                openSettings: !sandboxState.openSettings,
              })
            }
          >
            <span className="sr-only">Åpne props-panel</span>
            <Settings aria-hidden className="invert" />
          </button>
        )}
      </div>
      <SettingsPanel />
    </div>
  );
};

export const EditorWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-2 rounded relative">
      <pre className="sandbox-editor font-code p-4 pr-20 overflow-x-auto rounded max-h-[400px] overflow-y-auto relative bg-canvas-background-inverted m-0">
        {children}
      </pre>
    </div>
  );
};
