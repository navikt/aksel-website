import { Popover } from "@navikt/ds-react";
import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import React, { useEffect, useRef, useState } from "react";
import { withErrorBoundary } from "../error-boundary";
import { copyCode } from "./Example";
import * as S from "./code.styles";

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
      <S.PreWrapper active={true}>
        <S.CopyButton
          ref={(node) => (buttonRef.current = node)}
          className="navds-body-short navds-body--small"
          onClick={() => handleCopy(code.code)}
        >
          Copy
        </S.CopyButton>
        <S.Pre>
          <S.SnippetCode
            language={language}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </S.Pre>
      </S.PreWrapper>

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
