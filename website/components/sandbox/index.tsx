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
  sandboxState: SandboxStateT;
  setSandboxState: React.Dispatch<SandboxStateT>;
};

export const SandboxContext = createContext<SandboxContextProps>({
  sandboxState: null,
  setSandboxState: () => null,
});

interface SandboxStateT {
  args: ParsedArgsT;
  propsState: StateT;
  openSettings: boolean;
  fullscreen: boolean;
  inlineSettings: boolean;
}

const Sandbox = ({ node }: { node: SandboxT }): JSX.Element => {
  const [code, setCode] = useState(null);
  const [reseting, setReseting] = useState(false);
  const preFocusCapture = useRef<HTMLDivElement>(null);
  const focusCapture = useRef<HTMLButtonElement>(null);

  const [sandboxState, setSandboxState] = useState<SandboxStateT>({
    args: null,
    propsState: null,
    openSettings: false,
    fullscreen: false,
    inlineSettings: true,
  });

  const sandboxComp: SandboxComponent | null = useMemo(
    () => getSandbox(node?.title),
    [node.title]
  );

  useEffect(() => {
    if (sandboxComp) {
      const args = generateState(sandboxComp.args);
      const newState = getInitialState(args);
      setSandboxState({ ...sandboxState, args, propsState: newState });
      setCode(formatCode(sandboxComp(newState.props, newState.variants)));
    }
  }, [sandboxComp]);

  const reset = () =>
    setSandboxState({
      ...sandboxState,
      propsState: getInitialState(sandboxState.args),
    });

  useEffect(() => {
    sandboxState.propsState &&
      setCode(
        formatCode(
          sandboxComp(
            sandboxState.propsState.props,
            sandboxState.propsState.variants
          )
        )
      );

    /* Hack to make editor update */
    setReseting(true);
    setTimeout(() => setReseting(false), 50);
  }, [sandboxState.propsState]);

  if (!node || !node.title) {
    return null;
  }

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
            sandboxState,
            setSandboxState,
          }}
        >
          {sandboxState.fullscreen ? <Fullscreen>{Editor}</Fullscreen> : Editor}
        </SandboxContext.Provider>
      ) : null}
    </>
  );
};

const LiveApp = withLive(Sandbox);

export default withErrorBoundary(LiveApp, "Sandbox");
