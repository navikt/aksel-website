import * as DsIcons from "@navikt/ds-icons";
import * as DsReact from "@navikt/ds-react";
import theme from "prism-react-renderer/themes/dracula";
import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
  withLive,
} from "react-live";
import styled from "styled-components";
import { DsCodeSandbox as SandboxT } from "../../lib/autogen-types";
import getSandbox from "../../sandbox";
import { SandboxComponent } from "../../sandbox/types";
import { withErrorBoundary } from "../error-boundary";
import { generateState, getInitialState, ParsedPropsT } from "./generateState";
import SettingsPanel from "./PropsPanel";
import { EditorWrapper, PreviewWrapper } from "./StyleWrappers";
import Tabs from "./Tabs";

function Live({ onEdit, reset }: any) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <Tabs reset={reset} openPanel={() => setSettingsOpen(true)} />
      <PreviewWrapper>
        <LivePreview />
        <LiveError />
      </PreviewWrapper>
      <EditorWrapper>
        <LiveEditor
          onChange={onEdit}
          cellPadding={16}
          theme={theme}
          style={{ backgroundColor: "transparent" }}
        />
      </EditorWrapper>
      <SettingsPanel open={settingsOpen} setOpen={setSettingsOpen} />
    </div>
  );
}

const LiveComponent = withLive(Live);

const scope = {
  ...DsReact,
  ...DsIcons,
  styled,
};

type SandboxContextProps = {
  state: { [key: string]: string | boolean };
  setState: React.Dispatch<any>;
  args: ParsedPropsT;
};

export const SandboxContext = createContext<SandboxContextProps>({
  state: {},
  setState: () => null,
  args: {},
});

const Sandbox = ({ node }: { node: SandboxT }): JSX.Element => {
  /* const layout = useContext(LayoutContext); */

  const [code, setCode] = useState(null);
  const [parsedArgs, setParsedArgs] = useState(null);
  const [state, setState] = useState(null);

  const sandboxComp: SandboxComponent | null = useMemo(
    () => getSandbox(node?.title),
    [node.title]
  );

  useEffect(() => {
    if (sandboxComp) {
      const args = generateState(sandboxComp.args);
      const newState = getInitialState(args);
      setParsedArgs(args);
      setState(newState);
      setCode(sandboxComp(newState));
    }
  }, [sandboxComp]);

  const reset = () => {
    console.log("reset!");
    setState(getInitialState(parsedArgs));
  };

  if (!node || !node.title) {
    return null;
  }

  useEffect(() => {
    state && setCode(sandboxComp(state));
  }, [state]);

  console.log(code);
  return (
    <>
      {code === null ? null : (
        <SandboxContext.Provider value={{ state, setState, args: parsedArgs }}>
          <LiveProvider code={code} scope={scope}>
            <LiveComponent onEdit={setCode} reset={reset} />
          </LiveProvider>
        </SandboxContext.Provider>
      )}
    </>
  );
};

const LiveApp = withLive(Sandbox);

export default withErrorBoundary(LiveApp, "Sandbox");
