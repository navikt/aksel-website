import { Popover } from "@navikt/ds-react";
import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { withErrorBoundary } from "../error-boundary";
import { CopyButton, copyCode } from "./Example";

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

const StyledCode = styled.code<{ language: string }>`
  color: white;
  font-size: 1rem;

  ${(props) => {
    return props.language === "bash"
      ? `
    ::before {
      content: "$ ";
    }`
      : ``;
  }}
`;

type CodeSnippetType = {
  node: {
    code: {
      code: string;
      language: string;
    };
  };
};

const CodeSnippet = ({ node: { code } }: CodeSnippetType): JSX.Element => {
  const buttonRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (openPopover) {
      timeoutRef.current = setTimeout(() => setOpenPopover(false), 1500);
      return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }
  }, [openPopover]);

  const handleCopy = (text: string) => {
    copyCode(text);
    setOpenPopover(true);
  };

  if (!code || !code.code || !code.language) {
    return null;
  }

  let language = code.language;
  language =
    language === "terminal" || language === "default" ? "bash" : language;

  const highlighted = Prism.highlight(
    code.code,
    Prism.languages[language],
    language
  );

  return (
    <>
      <PreWrapper>
        <CopyButton
          ref={(node) => (buttonRef.current = node)}
          className="navds-body-short navds-body--small"
          onClick={() => handleCopy(code.code)}
        >
          Copy
        </CopyButton>
        <Pre>
          <StyledCode
            language={language}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </Pre>
      </PreWrapper>

      <Popover
        role="alert"
        aria-atomic="true"
        anchorEl={buttonRef.current}
        open={openPopover}
        onClose={() => setOpenPopover(false)}
        placement="right"
        offset={12}
        arrow={false}
      >
        <Popover.Content style={{ padding: "0.75rem" }}>
          Kopierte kodesnutt
        </Popover.Content>
      </Popover>
    </>
  );
};

export default withErrorBoundary(CodeSnippet, "Kode snippet");
