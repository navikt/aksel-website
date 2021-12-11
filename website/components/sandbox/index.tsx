import * as DsIcons from "@navikt/ds-icons";
import * as DsReact from "@navikt/ds-react";
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
import { generateState, getInitialState, ParsedPropsT } from "./generateState";
import SettingsPanel from "./PropsPanel";
import { EditorWrapper, PreviewWrapper } from "./StyleWrappers";
import Tabs from "./Tabs";

const scope = {
  ...DsReact,
  ...DsIcons,
  styled,
};

type SandboxContextProps = {
  state: { [key: string]: string | boolean };
  setState: React.Dispatch<any>;
  args: ParsedPropsT;
  setVariant: React.Dispatch<any>;
  variant: VariantT;
};

export const SandboxContext = createContext<SandboxContextProps>({
  state: null,
  setState: () => null,
  args: null,
  setVariant: () => null,
  variant: null,
});

export type VariantT = {
  options: string[];
  value: string;
};

const Sandbox = ({ node }: { node: SandboxT }): JSX.Element => {
  /* const layout = useContext(LayoutContext); */

  const [code, setCode] = useState(null);
  const [parsedArgs, setParsedArgs] = useState(null);
  const [state, setState] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [variant, setVariant] = useState<VariantT>(null);
  const [reseting, setReseting] = useState(false);
  const preFocusCapture = useRef<HTMLDivElement>(null);
  const focusCapture = useRef<HTMLButtonElement>(null);

  const sandboxComp: SandboxComponent | null = useMemo(
    () => getSandbox(node?.title),
    [node.title]
  );

  useEffect(() => {
    if (sandboxComp) {
      const args = generateState(sandboxComp.args);
      sandboxComp?.args?.variants &&
        setVariant({
          options: sandboxComp.args.variants,
          value: sandboxComp.args.variants[0],
        });
      const newState = getInitialState(args);
      setParsedArgs(args);
      setState(newState);
      setCode(sandboxComp(newState));
    }
  }, [sandboxComp]);

  const reset = () => {
    setState(getInitialState(parsedArgs));
    setVariant({
      options: sandboxComp.args.variants,
      value: sandboxComp.args.variants[0],
    });
  };

  if (!node || !node.title) {
    return null;
  }

  useEffect(() => {
    state && variant?.value && setCode(sandboxComp(state, variant.value));

    /* Hack to make editor update */
    setReseting(true);
    setTimeout(() => setReseting(false), 50);
  }, [state, variant]);

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      event.shiftKey
        ? preFocusCapture.current?.focus()
        : focusCapture.current?.focus();
    }
  };

  return (
    <>
      {code !== null ? (
        <SandboxContext.Provider
          value={{ state, setState, args: parsedArgs, variant, setVariant }}
        >
          <LiveProvider code={code} scope={scope}>
            <div style={{ position: "relative" }}>
              <Tabs reset={reset} openPanel={() => setSettingsOpen(true)} />
              <PreviewWrapper>
                <LivePreview />
                <LiveError />
              </PreviewWrapper>
              <div ref={preFocusCapture} tabIndex={-1} />
              <EditorWrapper>
                {reseting ? (
                  <LiveEditor
                    key="old-editor"
                    theme={theme}
                    style={{ backgroundColor: "transparent" }}
                  />
                ) : (
                  <LiveEditor
                    key="new-editor"
                    onChange={setCode}
                    theme={theme}
                    style={{ backgroundColor: "transparent" }}
                    onKeyDown={handleKeyDown}
                  />
                )}
                <CopyButton ref={focusCapture} content={code} inTabs={false} />
              </EditorWrapper>
              <SettingsPanel open={settingsOpen} setOpen={setSettingsOpen} />
            </div>
          </LiveProvider>
        </SandboxContext.Provider>
      ) : null}
    </>
  );
};

const LiveApp = withLive(Sandbox);

export default withErrorBoundary(LiveApp, "Sandbox");
