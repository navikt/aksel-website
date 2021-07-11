import styled from "styled-components";
import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import React, { useContext, useRef } from "react";
import { CodeContext, CopyButton, copyCode, StyledPopover } from "./Code";

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

const CodeBlock = ({ index }: { index: number }): JSX.Element => {
  const {
    node,
    tabs: tmpTabs,
    previewToggles: tmpPreviewToggles,
    popover: tmpPopover,
    showPreview,
    showTabs,
  } = useContext(CodeContext);
  const [tabs, setTabs] = tmpTabs;
  const [previewToggles, setPreviewToggles] = tmpPreviewToggles;
  const [popover, setPopover] = tmpPopover;

  const buttonRef = useRef(null);

  const activeIndex =
    tabs.findIndex((tab) => tab.active) !== -1 &&
    tabs[tabs.findIndex((tab) => tab.active)].index;

  if (!!activeIndex || !node.tabs[index].example.code) {
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
            className="navds-body-short navds-body--s"
            onClick={() => handleCopy(node.tabs[index].example.code)}
          >
            Copy
          </CopyButton>
        )}
        <Pre>
          <StyledCode dangerouslySetInnerHTML={{ __html: highlighted }} />
        </Pre>
      </PreWrapper>

      <StyledPopover
        role="alert"
        aria-atomic="true"
        anchorEl={buttonRef.current}
        open={popover}
        onClose={() => setPopover(false)}
        placement="right"
        arrow={false}
      >
        Kopiert
      </StyledPopover>
    </>
  );
};

export default CodeBlock;
