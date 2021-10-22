import React, { createContext, useEffect, useState } from "react";
import { withErrorBoundary } from "../../error-boundary";
import CodeBlock from "./Block";
import CodePreview from "./Preview";
import CodeTabs from "./Tabs";
import { DsCodeExample as DsCodeExampleT } from "../../../lib/autogen-types";
import styled from "styled-components";

type TabType = { name: string; content: React.ReactNode; language?: string };

type ContextProps = {
  node: Partial<DsCodeExampleT>;
  tabs: TabType[];
  setTabs: React.Dispatch<React.SetStateAction<TabType[]>>;
  showTabs: boolean;
  showPreview: boolean;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
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
  fullscreenLink: "",
  setFullscreenLink: () => null,
});

const ScDiv = styled.div`
  width: 100%;
  margin-bottom: var(--navds-spacing-12);
  display: flex;
  flex-direction: column;
`;

const ScExampleDiv = styled.aside`
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  padding: 0;
  position: relative;
  border: 1px solid var(--navds-color-gray-20);
  border-bottom: none;

  :only-child {
    border-bottom: 1px solid var(--navds-color-gray-20);
  }
`;

const Code = ({ node }: { node: DsCodeExampleT }): JSX.Element => {
  const [tabs, setTabs] = useState<TabType[]>(
    node?.infercode
      ? [
          {
            name: "",
            content: "",
            language: "html",
          },
        ]
      : []
  );
  const [activeTab, setActiveTab] = useState(-1);
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
        fullscreenLink,
        setFullscreenLink,
      }}
    >
      <ScDiv>
        {showPreview && (
          <ScExampleDiv>
            <CodePreview />
          </ScExampleDiv>
        )}
        {showTabs && <CodeTabs />}
        {(node.tabs || tabs) &&
          tabs.map((tab, i) => (
            <CodeBlock key={tab.content.toString()} index={i} />
          ))}
      </ScDiv>
    </CodeContext.Provider>
  );
};

export default withErrorBoundary(Code, "Kode eksempel");
