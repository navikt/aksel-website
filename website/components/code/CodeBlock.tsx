import styled from "styled-components";
import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import React, { useContext, useEffect, useRef, useState } from "react";
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
  const { tabs, showTabs, activeTab } = useContext(CodeContext);

  const buttonRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (openPopover) {
      timeoutRef.current = setTimeout(() => setOpenPopover(false), 1500);
      return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [openPopover]);

  if (activeTab === -1) {
    return null;
  }

  const handleCopy = (text: string) => {
    copyCode(text);
    setOpenPopover(true);
  };

  let language = tabs[index].language ?? "jsx";
  language =
    language === "terminal" || language === "default" ? "bash" : language;

  const highlighted = Prism.highlight(
    tabs[index].content,
    Prism.languages[language],
    language
  );

  return (
    <>
      <PreWrapper
        style={{
          display: activeTab === index ? "block" : "none",
        }}
      >
        <CopyButton
          ref={(node) => (buttonRef.current = node)}
          className="navds-body-short navds-body--small"
          onClick={() => handleCopy(tabs[index].content.toString())}
        >
          Copy
        </CopyButton>
        <Pre data-tabs={showTabs}>
          <StyledCode dangerouslySetInnerHTML={{ __html: highlighted }} />
        </Pre>
      </PreWrapper>

      <Popover
        role="alert"
        aria-atomic="true"
        anchorEl={buttonRef.current}
        open={openPopover}
        onClose={() => setOpenPopover(false)}
        placement="right"
        arrow={false}
      >
        <Popover.Content style={{ padding: "0.75rem" }}>
          Kopierte kodesnutt
        </Popover.Content>
      </Popover>
    </>
  );
};

export default CodeBlock;
