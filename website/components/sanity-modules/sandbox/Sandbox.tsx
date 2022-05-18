import { BgColors } from "@/lib";
import * as DsIcons from "@navikt/ds-icons";
import * as DsReact from "@navikt/ds-react";
import * as DsReactInternal from "@navikt/ds-react-internal";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
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
import { DsCodeSandbox as SandboxT } from "../../../lib";
import getSandbox from "../../../stories/sandbox";
import { SandboxComponent } from "../../../stories/sandbox/types";
import { withErrorBoundary } from "../../ErrorBoundary";
import CopyButton from "../code/CopyButton";
import PreviewWrapper from "./PreviewWrapper";
import {
  generateState,
  getInitialState,
  ParsedArgsT,
  StateT,
} from "./settings-panel/generateState";

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
  format: (date, f) => format(date, f, { locale: nb }),
  ...DsIcons,
  ...DsReact,
  ...DsReactInternal,
};

type SandboxContextProps = {
  sandboxState: SandboxStateT;
  setSandboxState: React.Dispatch<React.SetStateAction<SandboxStateT>>;
  bg: BgColors;
  setBg: React.Dispatch<React.SetStateAction<string>>;
  reset: () => void;
  visibleCode: boolean;
  setVisibleCode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SandboxContext = createContext<SandboxContextProps>({
  sandboxState: null,
  setSandboxState: () => null,
  bg: null,
  setBg: () => null,
  reset: () => null,
  visibleCode: false,
  setVisibleCode: () => null,
});

interface SandboxStateT {
  args: ParsedArgsT;
  propsState: StateT;
  openSettings: boolean;
}

const Sandbox = ({ node }: { node: SandboxT }): JSX.Element => {
  const [code, setCode] = useState<string>(null);
  const [visibleCode, setVisibleCode] = useState(false);
  const [reseting, setReseting] = useState(false);
  const preFocusCapture = useRef<HTMLDivElement>(null);
  const focusCapture = useRef<HTMLButtonElement>(null);
  const [background, setBackground] = useState(null);

  const [sandboxState, setSandboxState] = useState<SandboxStateT>({
    args: null,
    propsState: null,
    openSettings: false,
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

      const sandboxStory = sandboxComp(newState.props);

      typeof sandboxStory === "string"
        ? setCode(formatCode(sandboxStory.trim()))
        : setCode(formatCode(sandboxStory.comp.trim()));

      if (typeof sandboxStory !== "string") {
        sandboxStory?.bg && setBackground(sandboxStory.bg);
      } else {
        sandboxComp?.args?.background &&
          setBackground(sandboxComp.args.background);
      }
    }
  }, [sandboxComp]);

  const reset = () =>
    setSandboxState({
      ...sandboxState,
      propsState: getInitialState(sandboxState.args),
    });

  useEffect(() => {
    const updateComp = () => {
      const sandboxStory = sandboxComp(sandboxState.propsState.props);
      if (typeof sandboxStory !== "string") {
        sandboxStory?.bg && setBackground(sandboxStory.bg);
        setCode(formatCode(sandboxStory.comp.trim()));
      } else {
        setCode(formatCode(sandboxStory.trim()));
        sandboxComp?.args?.background
          ? setBackground(sandboxComp.args.background)
          : setBackground(null);
      }
    };

    sandboxState.propsState && updateComp();

    /* Hack to make editor update */
    setReseting(true);
    setTimeout(() => setReseting(false), 50);
  }, [sandboxState.propsState]);

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      event.shiftKey
        ? preFocusCapture.current?.focus()
        : focusCapture.current?.focus();
    }
  };

  if (!node || !node.title) {
    return null;
  }

  const Editor = (
    <LiveProvider code={code} scope={scope} noInline={!code?.startsWith("<")}>
      <div className="algolia-ignore-index relative mb-8">
        <PreviewWrapper>
          <LivePreview />
          <LiveError />
        </PreviewWrapper>
        {visibleCode && (
          <>
            <div ref={preFocusCapture} tabIndex={-1} />
            <div className="relative mt-2 animate-fadeIn rounded">
              <pre className="sandbox-editor relative m-0 max-h-[300px] overflow-x-auto overflow-y-auto rounded-lg bg-canvas-background-inverted p-4 pr-20 font-mono">
                {reseting ? (
                  <LiveEditor
                    style={{
                      overflowX: "auto",
                      whiteSpace: "pre",
                      backgroundColor: "transparent",
                    }}
                    className="overflow-x-auto whitespace-pre bg-transparent"
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
              </pre>
            </div>
          </>
        )}
      </div>
    </LiveProvider>
  );

  return (
    <>
      {code !== null ? (
        <SandboxContext.Provider
          value={{
            sandboxState,
            setSandboxState,
            bg: background,
            setBg: setBackground,
            visibleCode,
            setVisibleCode,
            reset,
          }}
        >
          {Editor}
        </SandboxContext.Provider>
      ) : null}
    </>
  );
};

const LiveApp = withLive(Sandbox);

export default withErrorBoundary(LiveApp, "Sandbox");
