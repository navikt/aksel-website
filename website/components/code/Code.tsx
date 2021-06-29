import Prism from "prismjs";
import React, { useRef, useState } from "react";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import styled from "styled-components";
import CodeExample from "./CodeExample";

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

const Div = styled.div`
  width: 100%;
  margin-bottom: var(--navds-spacing-8);
`;

const Pre = styled.pre`
  overflow-x: auto;
  font-family: var(--navds-font-family);
  background-color: var(--navds-color-darkgray);
  margin: 0;
  padding: 1rem;
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
  color: var(--navds-color-blue-50);
  border: none;
  background: none;
  padding: 0.5rem 1.5rem 0.25rem 1.5rem;
  border-bottom: 4px solid transparent;
  text-transform: uppercase;

  :hover {
    border-bottom: 4px solid var(--navds-color-darkgray);
    color: var(--navds-color-darkgray);
  }

  :focus {
    outline: 2px solid var(--navds-color-blue-80);
    outline-offset: -2px;
  }

  &[aria-selected="true"] {
    color: var(--navds-color-blue-50);
    border-bottom: 4px solid var(--navds-color-blue-50);
  }
`;

const Code = ({ node }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  if (!node.code_preview && !node.codeExample?.code) {
    return null;
  }

  const language =
    node.code_examples_tabs[activeTab].codeExample.language ?? "jsx";

  const highlighted = Prism.highlight(
    node.code_examples_tabs[activeTab].codeExample.code,
    Prism.languages[language],
    language
  );

  const codePreview = () => {
    return (
      <div>
        <Pre>
          <code
            ref={ref}
            className={`language-${
              node.code_examples_tabs[activeTab].codeExample?.language
                ? node.code_examples_tabs[activeTab].codeExample.language
                : "jsx"
            }`}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </Pre>
      </div>
    );
  };

  return (
    <Div>
      {node.code_preview && <CodeExample component={node.code_preview} />}
      {node.code_examples_tabs && (
        <>
          <Ul>
            {node.code_examples_tabs.map((code, x) => {
              return (
                <Li key={code._key}>
                  <Button
                    aria-selected={x === activeTab}
                    onClick={() => setActiveTab(x)}
                  >
                    {code.codeExample.language ?? "CODE"}
                  </Button>
                </Li>
              );
            })}
          </Ul>
          {codePreview()}
        </>
      )}
    </Div>
  );
};

export default Code;
