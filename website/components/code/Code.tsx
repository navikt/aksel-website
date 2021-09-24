import copy from "copy-to-clipboard";
import React, { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import CodeBlock from "./CodeBlock";
import CodePreview from "./CodePreview";
import CodeTabs from "./CodeTabs";

const Wrapper = styled.div`
  width: 100%;
  margin-top: var(--navds-spacing-8);
  margin-bottom: var(--navds-spacing-12);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const Example = styled.div`
  background-color: #fff;
  background-image: linear-gradient(
      45deg,
      rgb(248, 248, 248) 25%,
      transparent 25%,
      transparent 75%,
      rgb(248, 248, 248) 75%
    ),
    linear-gradient(
      45deg,
      rgb(248, 248, 248) 25%,
      transparent 25%,
      transparent 75%,
      rgb(248, 248, 248) 75%
    );
  background-size: 32px 32px;
  background-position: 0 0, 16px 16px;
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
    background-color: var(--navds-color-gray-80);
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
  top: 3px;
  right: 3px;
  background-color: var(--navds-color-darkgray);
`;

export const copyCode = (content: string): void => {
  if (typeof content === "string") {
    copy(content, {
      format: "text/plain",
    });
  }
};

type TabType = { name: string; content: React.ReactNode; language?: string };
type PreviewType = { ruler: boolean; outlines: boolean };

type ContextProps = {
  node: any;
  tabs: TabType[];
  setTabs: React.Dispatch<React.SetStateAction<TabType[]>>;
  showTabs: boolean;
  showPreview: boolean;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  previews: PreviewType;
  setPreviews: React.Dispatch<React.SetStateAction<PreviewType>>;
  fullscreenLink: string;
  setFullscreenLink: React.Dispatch<React.SetStateAction<string>>;
};

export const CodeContext = createContext<ContextProps>({
  node: {},
  tabs: [],
  setTabs: () => null,
  showTabs: false,
  showPreview: false,
  activeTab: 0,
  setActiveTab: () => null,
  previews: { ruler: false, outlines: false },
  setPreviews: () => null,
  fullscreenLink: "",
  setFullscreenLink: () => null,
});

const Code = ({ node }: { node: any }): JSX.Element => {
  const [tabs, setTabs] = useState<TabType[]>([]);
  const [activeTab, setActiveTab] = useState(-1);
  const [previews, setPreviews] = useState<PreviewType>({
    ruler: false,
    outlines: false,
  });
  const [fullscreenLink, setFullscreenLink] = useState("");

  if (
    (!node.preview && !node?.tabs) ||
    (node.preview && !node?.infercode === undefined)
  ) {
    return null;
  }

  useEffect(() => {
    if (node.infercode === true) return;
    const tabList: TabType[] = [];
    node.tabs &&
      node.tabs.forEach((tab) =>
        tabList.push({
          name: tab.title,
          content: tab.example.code,
          language: tab.example.language,
        })
      );
    setTabs([...tabList]);
  }, []);

  const showPreview = !!node.preview;
  const showTabs =
    (!!node.preview && tabs.length > 0) || (!node.preview && tabs.length > 1);

  return (
    <CodeContext.Provider
      value={{
        node,
        tabs,
        setTabs,
        showPreview,
        activeTab,
        setActiveTab,
        showTabs,
        previews,
        setPreviews,
        fullscreenLink,
        setFullscreenLink,
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
};

export default Code;
