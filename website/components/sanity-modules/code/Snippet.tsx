import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import React, { useEffect, useState } from "react";
import { withErrorBoundary } from "../../ErrorBoundary";
import * as S from "./code.styles";
import { CodeSnippet as CodeSnippetT, Kode } from "../../../lib";
import CopyButton from "./CopyButton";
import styled from "styled-components";

const ScCode = styled.code<{ language: string }>`
  color: var(--navds-semantic-color-text-inverted);
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

const CodeSnippet = ({
  node: { code },
}: {
  node: CodeSnippetT | Kode;
}): JSX.Element => {
  const [highlightedCode, setHighlightedCode] = useState(null);

  if (!code || !code.code) {
    return null;
  }

  let language = code.language ?? "javascript";
  language =
    language === "terminal" || language === "default" ? "bash" : language;

  useEffect(() => {
    setHighlightedCode(
      Prism.highlight(code.code, Prism.languages[language], language)
    );
  }, [code.code, code.language]);

  return (
    <>
      <S.PreWrapper active={true} standalone>
        <CopyButton content={code.code} />
        <S.Pre className="language-">
          <ScCode
            className="language-"
            language={language}
            dangerouslySetInnerHTML={{ __html: highlightedCode ?? code.code }}
          />
        </S.Pre>
      </S.PreWrapper>
    </>
  );
};

export default withErrorBoundary(CodeSnippet, "Kode snippet");
