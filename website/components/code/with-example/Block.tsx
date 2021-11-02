import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import React, { useContext, useEffect, useState } from "react";
import * as S from "../code.styles";
import CopyButton from "../CopyButton";
import { CodeContext } from "./Example";

const CodeBlock = ({ index }: { index: number }): JSX.Element => {
  const { tabs, showTabs, activeTab, showPreview } = useContext(CodeContext);
  const [highlightedCode, setHighlightedCode] = useState(null);

  let language = tabs[index].language ?? "jsx";
  language =
    language === "terminal" || language === "default" ? "bash" : language;

  useEffect(() => {
    setHighlightedCode(
      Prism.highlight(tabs[index].content, Prism.languages[language], language)
    );
  }, [index]);

  if (activeTab === -1) {
    return null;
  }

  return (
    <>
      <S.PreWrapper active={activeTab === index}>
        {!showPreview && !showTabs && (
          <CopyButton content={tabs[index].content.toString()} />
        )}
        <S.Pre className="language-" data-tabs={showTabs}>
          <S.Code
            className="language-"
            dangerouslySetInnerHTML={{
              __html: highlightedCode ?? tabs[index].content,
            }}
          />
        </S.Pre>
      </S.PreWrapper>
    </>
  );
};

export default CodeBlock;
