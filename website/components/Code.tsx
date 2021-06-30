import Prism from "prismjs";
import React, { useEffect, useState } from "react";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-typescript.min";
import styled from "styled-components";
import RenderExample from "examples";
import copy from "copy-to-clipboard";
import { ExternalLink, Copy } from "@navikt/ds-icons";

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
  padding: 2rem 0;
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

const PreWrapper = styled.div`
  position: relative;
  background-color: var(--navds-color-darkgray);
  border-radius: 8px;

  :only-child {
    pre {
      border-radius: 8px;
    }
  }
`;

const Tabs = styled.div`
  border-bottom: 1px solid var(--navds-color-gray-60);
  background-color: var(--navds-color-darkgray);
  padding: 1px 1px 0 1px;
  width: calc(100% - 2px);
  display: flex;
  justify-content: space-between;
`;

const Pre = styled.pre`
  overflow-x: auto;
  align-items: center;
  display: flex;
  border-end-end-radius: 8px;
  border-end-start-radius: 8px;
  background-color: var(--navds-color-darkgray);
  margin: 0;
  padding: 1rem 1rem 1rem 1rem;
`;

const StyledCode = styled.code`
  color: white;
  font-size: 1rem;
`;

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
`;

const Li = styled.li`
  list-style: none;
`;

const Button = styled.button`
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

const CopyButton = styled(Button)`
  position: absolute;
  right: 0.3125rem;
  top: 0.3125rem;
`;

const A = styled.a`
  color: rgba(255, 255, 255, 0.85);
  padding: 0.75rem 0.5rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  text-decoration: none;

  :hover {
    background-color: rgba(255, 255, 255, 0.15);
    text-decoration: underline;
  }

  :focus {
    outline: 2px solid white;
    outline-offset: -2px;
    text-decoration: underline;
  }
`;

const CopyWrapper = styled.div`
  display: flex;
`;

const copyCode = (content) => {
  if (typeof content === "string") {
    copy(content, {
      format: "text/plain",
    });
  }
};

const Code = ({ node }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<{ title: string; index: number }[]>([]);

  useEffect(() => {
    const tabList = [];
    node.tabs &&
      node.tabs.forEach((tab, x) =>
        tabList.push({ title: tab.title, index: x })
      );

    setTabs([...tabList]);
  }, []);

  if (!node.preview && !node?.tabs) {
    return null;
  }

  const renderCodePreview = (index, showtabs) => {
    if (!node.tabs[index].example.code) {
      return null;
    }

    let language = node.tabs[index].example.language ?? "jsx";
    language = language === "terminal" ? "bash" : language;

    const highlighted = Prism.highlight(
      node.tabs[index].example.code,
      Prism.languages[language],
      language
    );

    return (
      <PreWrapper style={{ display: index === activeTab ? "block" : "none" }}>
        {!showtabs && (
          <CopyButton
            className="navds-body-short navds-body--s"
            onClick={() => copyCode(node.tabs[index].example.code)}
          >
            Copy
          </CopyButton>
        )}
        <Pre>
          <StyledCode dangerouslySetInnerHTML={{ __html: highlighted }} />
        </Pre>
      </PreWrapper>
    );
  };

  const renderTabs = () => {
    return (
      <Tabs>
        <Ul role="tablist">
          {tabs.map((tab) => (
            <Li key={tab.title} role="presentation">
              <Button
                role="tab"
                className="navds-body-short navds-body--s"
                onClick={() => setActiveTab(tab.index)}
                aria-selected={activeTab === tab.index}
              >
                {tab.title}
              </Button>
            </Li>
          ))}
        </Ul>

        <CopyWrapper>
          {node.github && (
            <A className="navds-body-short navds-body--s" href={node.github}>
              Github <ExternalLink aria-label="Boks med pil ut" />
            </A>
          )}
          <Button
            className="navds-body-short navds-body--s"
            onClick={() => copyCode(node.tabs[activeTab].example.code)}
          >
            Copy
            <Copy />
          </Button>
        </CopyWrapper>
      </Tabs>
    );
  };

  const showPreview = node.preview;
  const showTabs =
    node.tabs && node.tabs.length > 0 && (showPreview || node.tabs.length > 1);

  return (
    <Wrapper>
      {showPreview && (
        <Example>
          <RenderExample component={node.preview} />
        </Example>
      )}
      {showTabs && renderTabs()}
      {node.tabs && node.tabs.map((_, i) => renderCodePreview(i, showTabs))}
    </Wrapper>
  );
};

export default Code;
