import { withErrorBoundary } from "@/error-boundary";
import { BgColors, DsCodeSandbox as SandboxT } from "@/lib";
import React, { createContext, useEffect, useMemo, useState } from "react";
import getSandbox from "../../../stories/sandbox";
import { SandboxComponentT } from "../../../stories/sandbox/types";
import { Preview } from "./Preview";
import {
  generateState,
  getInitialState,
  ParsedArgsT,
  StateT,
} from "./settings-panel/generateState";
import dynamic from "next/dynamic";

const CodeBlock = dynamic(() => import("./CodeBlock"), {
  ssr: false,
});

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
}

const Sandbox = ({ node }: { node: SandboxT }) => {
  const [sandboxState, setSandboxState] = useState<SandboxStateT>({
    args: null,
    propsState: null,
  });

  const reset = () =>
    setSandboxState({
      ...sandboxState,
      propsState: getInitialState(sandboxState.args),
    });

  const sandboxComp: SandboxComponentT | null = useMemo(
    () => getSandbox(node?.title) as SandboxComponentT,
    [node?.title]
  );

  useEffect(() => {
    const args = generateState(sandboxComp.args);
    const newState = getInitialState(args);
    setSandboxState({ ...sandboxState, args, propsState: newState });
  }, [node?.title]);

  const Component = () => sandboxComp(sandboxState?.propsState?.props);

  const code = sandboxComp?.getCode?.(sandboxState?.propsState?.props);
  return (
    <SandboxContext.Provider
      value={{
        sandboxState,
        setSandboxState,
        bg:
          sandboxComp?.getBg?.(sandboxState?.propsState?.props) ??
          BgColors.DEFAULT,
        reset,
      }}
    >
      <div className="algolia-ignore-index relative mb-8">
        <Preview>
          <Component />
        </Preview>
        {code && <CodeBlock code={code} />}
      </div>
    </SandboxContext.Provider>
  );
};

export default withErrorBoundary(Sandbox, "Sandbox");
