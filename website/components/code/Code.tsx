import copy from "copy-to-clipboard";
import React, { createContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CodeBlock from "./CodeBlock";
import CodePreview from "./CodePreview";
import CodeTabs from "./CodeTabs";

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
  padding: 0.75rem 0.75rem;
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

export const copyCode = (content: string): void => {
  if (typeof content === "string") {
    copy(content, {
      format: "text/plain",
    });
  }
};

type TabType = { name: string; content: React.ReactNode };

type ContextProps = {
  node: any;
  tabs: TabType[];
  setTabs: React.Dispatch<React.SetStateAction<TabType[]>>;
  openPopover: boolean;
  setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
  showTabs: boolean;
  showPreview: boolean;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
};

export const CodeContext = createContext<ContextProps>({
  node: {},
  tabs: [],
  setTabs: () => null,
  openPopover: false,
  setOpenPopover: () => null,
  showTabs: false,
  showPreview: false,
  activeTab: 0,
  setActiveTab: () => null,
});

const Code = ({ node }: { node: any }): JSX.Element => {
  const [tabs, setTabs] = useState<TabType[]>([]);
  const [openPopover, setOpenPopover] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (openPopover) {
      timeoutRef.current = setTimeout(() => setOpenPopover(false), 1500);
      return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [openPopover]);

  if ((!node.preview && !node?.tabs) || !node?.infercode === undefined) {
    return null;
  }

  const showPreview = !!node.preview;
  const showTabs = tabs.length > 0;

  return (
    <CodeContext.Provider
      value={{
        node,
        tabs,
        setTabs,
        openPopover,
        setOpenPopover,
        showPreview,
        activeTab,
        setActiveTab,
        showTabs,
      }}
    >
      <Wrapper>
        {showPreview && (
          <Example>
            <CodePreview />
          </Example>
        )}
        {showTabs && <CodeTabs />}
        {(node.tabs || tabs) &&
          tabs.map((tab, i) => (
            <CodeBlock key={tab.content.toString()} index={i} />
          ))}
      </Wrapper>
    </CodeContext.Provider>
  );

  /* const [tabs, setTabs] = useState<
    { title: string; active: false; content: string }[]
  >([]);
  const [openPopover, setOpenPopover] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [previewToggles, setPreviewToggles] = useState({
    ruler: false,
    outline: false,
  });

  useEffect(() => {
    const tabList = []; */
  /* node.tabs &&
      node.tabs.forEach((tab, x) =>
        tabList.push({ title: tab.title, active: x === 0 })
      ); */

  /* setTabs([...tabList]);
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

  const showPreview = !!node.preview;
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
            <CodePreview />
          </Example>
        )}
        {showTabs && <CodeTabs />}
        {(node.tabs || tabs) &&
          tabs.map((tab, i) => <CodeBlock key={tab.title} index={i} />)}
      </Wrapper>
    </CodeContext.Provider>
  ); */

  return <div></div>;
};

export default Code;
