import Prism from "prismjs";
import React, { useEffect, useRef, useState } from "react";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-typescript.min";
import styled from "styled-components";
import CodeExample from "./CodeExample";
import RenderExample from "examples";

/* const PrismLanguages = [
  "insertBefore",
  "DFS",
  "markup",
  "html",
  "mathml",
  "svg",
  "xml",
  "ssml",
  "atom",
  "rss",
  "css",
  "clike",
  "javascript",
  "js",
  "jsx",
]; */

const Wrapper = styled.div`
  width: 100%;
  margin-top: var(--navds-spacing-8);
  margin-bottom: var(--navds-spacing-8);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--navds-color-darkgray);
  background-color: #f9f9f9;
`;

const Div = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  /*   justify-content: center; */
  align-items: center;
  background-color: var(--navds-color-darkgray);
  border: 1px solid var(--navds-color-darkgray);
`;
const Example = styled.div`
  background-color: #f9f9f9;
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 2rem 0;
  border-radius: 8px;
  position: relative;
`;

const PreWrapper = styled.div`
  position: relative;
`;

const Tabs = styled.div`
  border-top: 1px solid var(--navds-color-darkgray);
  border-bottom: 1px solid var(--navds-color-gray-60);
  background-color: var(--navds-color-darkgray);
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Pre = styled.pre`
  overflow-x: auto;
  align-items: center;
  display: flex;
  font-family: var(--navds-font-family);
  border-end-end-radius: 8px;
  border-end-start-radius: 8px;
  background-color: var(--navds-color-darkgray);
  margin: 0;
  padding: 1rem 1rem 1rem 1rem;
  &[data-terminal="true"] {
    ::before {
      content: "$    ";
      color: white;
    }
    code {
      /* padding-left: 1rem; */
    }
  }
`;

const StyledCode = styled.code`
  color: white;
  font-size: 1rem;
  /* font-family: var(--font-family-code); */
`;

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  padding-bottom: var(--navds-spacing-2);
  display: flex;
  border-left: 2px solid var(--navds-color-gray-20);
  border-right: 2px solid var(--navds-color-gray-20);
`;

const Li = styled.li`
  list-style: none;
`;

const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.95);
  /* border: 1px solid rgba(255, 255, 255, 0.45); */
  border-top: 0;
  border-left: 0;
  border: none;
  border-right: 1px solid var(--navds-color-darkgray);

  background-color: rgba(255, 255, 255, 0);
  /* border-radius: 8px; */
  color: var(--navds-color-darkgray);
  color: rgba(255, 255, 255, 0.85);
  padding: 0.75rem 0.5rem;
  /* border-bottom: 4px solid transparent; */

  :hover {
    /* border-bottom: 4px solid var(--navds-color-darkgray); */
    background-color: rgba(255, 255, 255, 0.15);
  }

  /* :focus {
    outline: 2px solid var(--navds-color-blue-80);
    outline-offset: -2px;
  } */

  &[aria-selected="true"] {
    /* color: var(--navds-color-blue-50); */
    /* border-bottom: 4px solid var(--navds-color-blue-50); */
    box-shadow: inset 0 -3px 0 0 white;
    color: white;
  }
`;

const Code = ({ node }) => {
  const [activeTab, setActiveTab] = useState("");
  const [tabs, setTabs] = useState<{ title: string; index: number }[]>([]);

  useEffect(() => {
    const tabList = [];
    node.code_examples_tabs &&
      node.code_examples_tabs.forEach((tab, x) =>
        tabList.push({ title: tab.title, index: x })
      );

    setTabs([...tabList]);
    setActiveTab(tabList.length !== 0 ? tabList[0].title : "");
  }, []);

  if (!node.code_preview && !node?.code_examples_tabs) {
    return null;
  }

  const codePreview = () => {
    if (activeTab === "") {
      return null;
    }

    const index = tabs.findIndex((tab) => tab.title === activeTab);
    console.log(node.code_examples_tabs);
    const language =
      node.code_examples_tabs[tabs[index].index].example.language ?? "jsx";

    const highlighted =
      language === "terminal"
        ? Prism.highlight(
            node.code_examples_tabs[tabs[index].index].example.code,
            Prism.languages["bash"],
            "bash"
          )
        : Prism.highlight(
            node.code_examples_tabs[tabs[index].index].example.code,
            Prism.languages[language],
            language
          );

    return (
      <Pre data-terminal={language === "terminal"}>
        <StyledCode dangerouslySetInnerHTML={{ __html: highlighted }} />
      </Pre>
    );
  };

  const renderTabs = () => {
    if (tabs.length === 0) {
      return null;
    }
    return (
      <Tabs>
        <div>
          {tabs.map((tab) => (
            <Button
              className="navds-body-short navds-body--s"
              onClick={() => setActiveTab(tab.title)}
              aria-selected={activeTab === tab.title}
            >
              {tab.title}
            </Button>
          ))}
        </div>
        <div>
          <Button
            className="navds-body-short navds-body--s"
            onClick={() => null}
          >
            Copy
          </Button>
        </div>
      </Tabs>
    );
  };

  return (
    <Wrapper>
      {node.code_preview && (
        <Example>
          <RenderExample component={node.code_preview} />
        </Example>
      )}
      {renderTabs()}
      <PreWrapper>{codePreview()}</PreWrapper>
    </Wrapper>
  );
};

export default Code;
