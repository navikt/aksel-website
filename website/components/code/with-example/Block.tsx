import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import React, { useContext } from "react";
import * as S from "../code.styles";
import CopyButton from "../CopyButton";
import { CodeContext } from "./Example";

const CodeBlock = ({ index }: { index: number }): JSX.Element => {
  const { tabs, showTabs, activeTab, showPreview } = useContext(CodeContext);

  if (activeTab === -1) {
    return null;
  }

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
      <S.PreWrapper active={activeTab === index}>
        {!showPreview && (
          <CopyButton content={tabs[index].content.toString()} />
        )}
        <S.Pre data-tabs={showTabs}>
          <S.Code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </S.Pre>
      </S.PreWrapper>
    </>
  );
};

export default CodeBlock;
