import copy from "copy-to-clipboard";
import React, { createContext, useEffect, useState } from "react";
import { withErrorBoundary } from "../error-boundary";
import CodeBlock from "./Block";
import CodePreview from "./Preview";
import CodeTabs from "./Tabs";
import * as S from "./code.styles";
import { CodeExampleT } from "../../lib";

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
  node: Partial<CodeExampleT>;
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

const Code = ({ node }: { node: CodeExampleT }): JSX.Element => {
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
      <S.Wrapper>
        {showPreview && (
          <S.Example>
            <CodePreview />
          </S.Example>
        )}
        {showTabs && <CodeTabs />}
        {(node.tabs || tabs) &&
          tabs.map((tab, i) => (
            <CodeBlock key={tab.content.toString()} index={i} />
          ))}
      </S.Wrapper>
    </CodeContext.Provider>
  );
};

export default withErrorBoundary(Code, "Kode eksempel");
