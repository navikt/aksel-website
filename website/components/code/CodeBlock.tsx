import styled from "styled-components";
import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import React, { useContext, useRef } from "react";
import { CodeContext, CopyButton, copyCode } from "./Code";
import { Popover } from "@navikt/ds-react";

const PreWrapper = styled.div`
  position: relative;
  background-color: var(--navds-color-darkgray);
  border-radius: 8px;
`;

const Pre = styled.pre`
  overflow-x: auto;
  align-items: center;
  display: flex;
  border-radius: 8px;
  background-color: var(--navds-color-darkgray);
  margin: 0;
  padding: 1rem 1rem 1rem 1rem;

  &[data-tabs="true"] {
    border-radius: 0;
    border-end-start-radius: 8px;
    border-end-end-radius: 8px;
  }
`;

const StyledCode = styled.code`
  color: white;
  font-size: 1rem;
`;

const CodeBlock = ({ index }: { index: number }): JSX.Element => {
  const {
    node,
    tabs: tmpTabs,
    popover: tmpPopover,
    showTabs,
  } = useContext(CodeContext);
  const [tabs] = tmpTabs;

  const [popover, setPopover] = tmpPopover;

  const buttonRef = useRef(null);

  const activeIndex = tabs.findIndex((tab) => tab.active);

  if (activeIndex === -1 || !node.tabs[index].example.code) {
    return null;
  }

  const handleCopy = (text: string) => {
    copyCode(text);
    setPopover(true);
  };

  let language = node.tabs[index].example.language ?? "jsx";
  language = language === "terminal" ? "bash" : language;

  const highlighted = Prism.highlight(
    node.tabs[index].example.code,
    Prism.languages[language],
    language
  );

  return (
    <>
      <PreWrapper
        style={{
          display: activeIndex === index ? "block" : "none",
        }}
      >
        {!showTabs && (
          <CopyButton
            ref={(node) => (buttonRef.current = node)}
            className="navds-body-short navds-body--small"
            onClick={() => handleCopy(node.tabs[index].example.code)}
          >
            Copy
          </CopyButton>
        )}
        <Pre data-tabs={showTabs}>
          <StyledCode dangerouslySetInnerHTML={{ __html: highlighted }} />
        </Pre>
      </PreWrapper>

      <Popover
        role="alert"
        aria-atomic="true"
        anchorEl={buttonRef.current}
        open={popover}
        onClose={() => setPopover(false)}
        placement="right"
        arrow={false}
      >
        <Popover.Content>Kopiert</Popover.Content>
      </Popover>
    </>
  );
};

export default CodeBlock;
