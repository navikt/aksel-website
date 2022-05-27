import { withErrorBoundary } from "@/error-boundary";
import { BgColors, DsCodeSandbox as SandboxT } from "@/lib";
import { stringifyJsx } from "@/utils";
import React, { createContext, useEffect, useMemo, useState } from "react";
import getSandbox from "../../../stories/sandbox";
import { SandboxComponentv2 } from "../../../stories/sandbox/types";
import { CodeBlock } from "./CodeBlock";
import { Preview } from "./Preview";
import {
  generateState,
  getInitialState,
  ParsedArgsT,
  StateT,
} from "./settings-panel/generateState";

type SandboxContextProps = {
  sandboxState: SandboxStateT;
  setSandboxState: React.Dispatch<React.SetStateAction<SandboxStateT>>;
  bg: BgColors;
  reset: () => void;
};

export const SandboxContext = createContext<SandboxContextProps>({
  sandboxState: null,
  setSandboxState: () => null,
  bg: null,
  reset: () => null,
});

interface SandboxStateT {
  args: ParsedArgsT;
  propsState: StateT;
  openSettings: boolean;
}

const Sandbox = ({ node }: { node: SandboxT }) => {
  const [sandboxState, setSandboxState] = useState<SandboxStateT>({
    args: null,
    propsState: null,
    openSettings: false,
  });

  const reset = () =>
    setSandboxState({
      ...sandboxState,
      propsState: getInitialState(sandboxState.args),
    });

  const sandboxComp: SandboxComponentv2 | null = useMemo(
    () => getSandbox(node?.title) as SandboxComponentv2,
    [node.title]
  );

  useEffect(() => {
    const args = generateState(sandboxComp.args);
    const newState = getInitialState(args);
    setSandboxState({ ...sandboxState, args, propsState: newState });
  }, []);

  const Component = sandboxComp(sandboxState?.propsState?.props);

  const isReact = React.isValidElement(Component);

  return (
    <SandboxContext.Provider
      value={{
        sandboxState,
        setSandboxState,
        bg: isReact ? sandboxComp?.args?.background : Component?.bg,
        reset,
      }}
    >
      <div className="algolia-ignore-index relative mb-8">
        <Preview>{isReact ? Component : Component.comp}</Preview>
        <CodeBlock code={stringifyJsx(Component as any)} />
      </div>
    </SandboxContext.Provider>
  );
};

export default withErrorBoundary(Sandbox, "Sandbox");
