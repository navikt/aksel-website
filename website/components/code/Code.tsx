import { Copy, ExternalLink, Ruler, Sight } from "@navikt/ds-icons";
import { Popover } from "@navikt/ds-react";
import copy from "copy-to-clipboard";
import React, { createContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CodeBlock from "./CodeBlock";
import CodePreview from "./CodePreview";
import CodeTabs from "./CodeTabs";
/* import RenderExample from "examples"; */

const Wrapper = styled.div`
  width: 100%;
  margin-top: var(--navds-spacing-8);
  margin-bottom: var(--navds-spacing-8);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const Example = styled.div`
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  padding: 0;
  border-radius: 8px;
  position: relative;
  border: 1px solid var(--navds-color-darkgray);
  border-end-end-radius: 0;
  border-end-start-radius: 0;
  border-bottom: none;

  :only-child {
    border-radius: 8px;
    border-bottom: 1px solid var(--navds-color-darkgray);
  }
`;

export const Button = styled.button`
  border: none;
  color: rgba(255, 255, 255, 0.85);
  padding: 0.75rem 0.5rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  background-color: transparent;

  :hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  :focus {
    outline: 2px solid white;
    outline-offset: -2px;
  }

  &[aria-selected="true"] {
    box-shadow: inset 0 -2px 0 0 white;
    color: white;
  }
`;

export const CopyButton = styled(Button)`
  position: absolute;
  right: 0.3125rem;
  top: 0.3125rem;
`;

export const StyledPopover = styled(Popover)`
  padding: var(--navds-spacing-1);
  border-radius: 4px;
`;

export const copyCode = (content: string): void => {
  if (typeof content === "string") {
    copy(content, {
      format: "text/plain",
    });
  }
};

type ContextProps = {
  node: any;
  tabs: any[];
  previewToggles: any[];
  popover: any[];
  showTabs: boolean;
  showPreview: boolean;
};

export const CodeContext = createContext<ContextProps>({
  node: {},
  tabs: [],
  previewToggles: [],
  popover: [],
  showTabs: false,
  showPreview: false,
});

const Code = ({ node }: { node: any }): JSX.Element => {
  const [tabs, setTabs] = useState<
    { title: string; index: number; active: false }[]
  >([]);
  const [openPopover, setOpenPopover] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [previewToggles, setPreviewToggles] = useState({
    ruler: false,
    outline: false,
  });

  useEffect(() => {
    const tabList = [];
    node.tabs &&
      node.tabs.forEach((tab, x) =>
        tabList.push({ title: tab.title, index: x, active: x === 0 })
      );

    setTabs([...tabList]);
  }, []);

  useEffect(() => {
    if (openPopover) {
      timeoutRef.current = setTimeout(() => setOpenPopover(false), 1500);
      return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [openPopover]);

  if (!node.preview && !node?.tabs) {
    return null;
  }

  const showPreview = node.preview;
  const showTabs =
    node.tabs && node.tabs.length > 0 && (showPreview || node.tabs.length > 1);

  return (
    <CodeContext.Provider
      value={{
        node,
        previewToggles: [previewToggles, setPreviewToggles],
        tabs: [tabs, setTabs],
        popover: [openPopover, setOpenPopover],
        showPreview,
        showTabs,
      }}
    >
      <Wrapper>
        {showPreview && (
          <Example>
            {/* <RenderExample component={node.preview} /> */}
            <CodePreview />
          </Example>
        )}
        {showTabs && <CodeTabs />}
        {node.tabs &&
          node.tabs.map((_, i) => (
            <CodeBlock key={node.tabs[i]._key} index={i} />
          ))}
      </Wrapper>
    </CodeContext.Provider>
  );
};

export default Code;
