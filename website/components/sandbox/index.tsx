import * as DsIcons from "@navikt/ds-icons";
import * as DsReact from "@navikt/ds-react";
import theme from "prism-react-renderer/themes/dracula";
import React, { useEffect, useMemo, useState } from "react";
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

const Sandbox = ({ node }: { node: SandboxT }): JSX.Element => {
  /* const layout = useContext(LayoutContext); */

  const [code, setCode] = useState(null);

  const sandboxComp: SandboxComponent | null = useMemo(
    () => getSandbox(node?.title),
    [node.title]
  );

  useEffect(() => {
    sandboxComp && setCode(sandboxComp({}));
  }, [sandboxComp]);

  const reset = () => {
    console.log("reset!");
    sandboxComp && setCode(sandboxComp({}));
  };

  if (!node || !node.title) {
    return null;
  }

  return (
    <>
      {code === null ? null : (
        <LiveProvider code={code} scope={scope}>
          {/* <button onClick={() => setIsDis(!isDis)}>change</button> */}
          <LiveComponent onEdit={setCode} reset={reset} />
        </LiveProvider>
      )}
    </>
  );
};

const LiveApp = withLive(Sandbox);

export default withErrorBoundary(LiveApp, "Sandbox");
