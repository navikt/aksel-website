import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import React from "react";
import { withErrorBoundary } from "../error-boundary";
import * as S from "./code.styles";
import { CodeSnippet as CodeSnippetT } from "../../lib/autogen-types";
import CopyButton from "./CopyButton";
import styled from "styled-components";

const ScCode = styled.code<{ language: string }>`
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

const CodeSnippet = ({
  node: { code },
}: {
  node: CodeSnippetT;
}): JSX.Element => {
  if (!code || !code.code) {
    return null;
  }

  let language = code.language ?? "javascript";
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
        <CopyButton content={code.code} />
        <S.Pre>
          <ScCode
            language={language}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </S.Pre>
      </S.PreWrapper>
    </>
  );
};

export default withErrorBoundary(CodeSnippet, "Kode snippet");
