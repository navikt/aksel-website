import * as DsIcons from "@navikt/ds-icons";
import * as DsReact from "@navikt/ds-react";
import babel from "prettier/parser-babel";
import prettier from "prettier/standalone";
import theme from "prism-react-renderer/themes/dracula";
import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import CopyButton from "../code/CopyButton";
import { withErrorBoundary } from "../error-boundary";
import Fullscreen from "./FullScreen";
import {
  generateState,
  getInitialState,
  ParsedArgsT,
  StateT,
} from "./generateState";
import SettingsPanel from "./PropsPanel";
import { EditorWrapper, PreviewWrapper } from "./StyleWrappers";
import Tabs from "./Tabs";

const ScRelativeDiv = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: var(--navds-spacing-7);
`;

const formatCode = (code: string) => {
  try {
    const formated = prettier.format(`${code}`, {
      parser: "babel",
      plugins: [babel],
      printWidth: 60,
      semi: false,
    });
    return formated.startsWith(";")
      ? formated.slice(1).replace(/\n$/, "")
      : formated.replace(/\n$/, "");
  } catch (e) {
    return code;
  }
};

const scope = {
  ...DsReact,
  ...DsIcons,
  styled,
};

type SandboxContextProps = {
  state: StateT;
  setState: React.Dispatch<StateT>;
  args: ParsedArgsT;
  fullscreen: boolean;
  setFullscreen: React.Dispatch<boolean>;
  inlinePropsPanel: boolean;
  setInlinePropsPanel: React.Dispatch<boolean>;
  openPropsPanel: boolean;
  setOpenPropsPanel: React.Dispatch<boolean>;
};

export const SandboxContext = createContext<SandboxContextProps>({
  state: null,
  setState: () => null,
  args: null,
  fullscreen: false,
  setFullscreen: () => null,
  inlinePropsPanel: true,
  setInlinePropsPanel: () => null,
  setOpenPropsPanel: () => null,
  openPropsPanel: true,
});

const Sandbox = ({ node }: { node: SandboxT }): JSX.Element => {
  /* const layout = useContext(LayoutContext); */

  const [code, setCode] = useState(null);
  const [parsedArgs, setParsedArgs] = useState(null);
  const [state, setState] = useState<StateT>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reseting, setReseting] = useState(false);
  const preFocusCapture = useRef<HTMLDivElement>(null);
  const focusCapture = useRef<HTMLButtonElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [inlinePropsPanel, setInlinePropsPanel] = useState(true);

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
      setCode(formatCode(sandboxComp(newState.props, newState.variants)));
    }
  }, [sandboxComp]);

  const reset = () => {
    setState(getInitialState(parsedArgs));
  };

  if (!node || !node.title) {
    return null;
  }

  useEffect(() => {
    state && setCode(formatCode(sandboxComp(state.props, state.variants)));

    /* Hack to make editor update */
    setReseting(true);
    setTimeout(() => setReseting(false), 50);
  }, [state]);

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      event.shiftKey
        ? preFocusCapture.current?.focus()
        : focusCapture.current?.focus();
    }
  };

  const Editor = (
    <LiveProvider code={code} scope={scope}>
      <ScRelativeDiv>
        <Tabs reset={reset} />
        <PreviewWrapper>
          <LivePreview />
          <LiveError />
          <SettingsPanel />
        </PreviewWrapper>
        <div ref={preFocusCapture} tabIndex={-1} />
        <EditorWrapper>
          {reseting ? (
            <LiveEditor
              style={{
                overflowX: "auto",
                whiteSpace: "pre",
                backgroundColor: "transparent",
              }}
              key="old-editor"
              theme={theme}
            />
          ) : (
            <LiveEditor
              key="new-editor"
              onChange={(v) => setCode(v)}
              theme={theme}
              style={{ backgroundColor: "transparent" }}
              onKeyDown={handleKeyDown}
            />
          )}
          <CopyButton ref={focusCapture} content={code} inTabs={false} />
        </EditorWrapper>
      </ScRelativeDiv>
    </LiveProvider>
  );

  return (
    <>
      {code !== null ? (
        <SandboxContext.Provider
          value={{
            state,
            setState,
            args: parsedArgs,
            fullscreen,
            setFullscreen,
            inlinePropsPanel,
            setInlinePropsPanel,
            setOpenPropsPanel: setSettingsOpen,
            openPropsPanel: settingsOpen,
          }}
        >
          {fullscreen ? <Fullscreen>{Editor}</Fullscreen> : Editor}
        </SandboxContext.Provider>
      ) : null}
    </>
  );
};

const LiveApp = withLive(Sandbox);

export default withErrorBoundary(LiveApp, "Sandbox");
