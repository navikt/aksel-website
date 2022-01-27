import { Settings } from "@navikt/ds-icons";
import React, { useContext } from "react";
import styled from "styled-components";
import ColorPicker from "./ColorPicker";
import SettingsPanel from "./PropsPanel";
import { SandboxContext } from "./Sandbox";
import cl from "classnames";

const ScDiv = styled.div<{
  inlineProps: boolean;
  background?: string;
}>`
  display: flex;
  width: 100%;
  background-color: ${(props) =>
    props.background.startsWith("--")
      ? `var(${props.background})`
      : `${props.background}`};
  border: 1px solid var(--navds-global-color-gray-200);
  position: relative;
  min-height: 400px;
  height: 100%;
`;

const ScInnerDiv = styled.div`
  gap: 1rem;
  padding: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  > div:first-child {
    width: 100%;
    gap: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  > pre {
    max-width: 100%;
    font-family: var(--font-family-code);
    white-space: break-spaces;
  }
`;

export const PreviewWrapper = ({ children }: { children: React.ReactNode }) => {
  const { sandboxState, setSandboxState, bg, setBg } =
    useContext(SandboxContext);
  const inlineProps = sandboxState.inlineSettings && !!sandboxState.args;

  const hideProps =
    !sandboxState.args ||
    ((!sandboxState.args.props ||
      Object.keys(sandboxState.args.props).length === 0) &&
      !sandboxState.args.variants);

  const showSettings = !hideProps && !sandboxState.inlineSettings;

  return (
    <ScDiv inlineProps={inlineProps} background={bg}>
      <ScInnerDiv className="relative">
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
      </ScInnerDiv>
      <SettingsPanel />
    </ScDiv>
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
