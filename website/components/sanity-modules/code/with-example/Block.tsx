import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import React, { useContext, useEffect, useState } from "react";
import CopyButton from "../CopyButton";
import { CodeContext } from "./Example";
import cl from "classnames";

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
      <div
        className={cl("relative mb-8 max-h-80 overflow-x-auto bg-gray-900", {
          block: activeTab === index,
          hidden: activeTab !== index,
          "rounded-md": !showPreview && !showTabs,
        })}
      >
        {!showPreview && !showTabs && (
          <CopyButton content={tabs[index].content.toString()} />
        )}
        <pre
          className={cl(
            "language- m-0 flex min-h-[5rem] items-center overflow-x-auto p-4",
            { "max-w-full": showTabs }
          )}
        >
          <code
            className="language- text-medium text-text-inverted"
            dangerouslySetInnerHTML={{
              __html: highlightedCode ?? tabs[index].content,
            }}
          />
        </pre>
      </div>
    </>
  );
};

export default CodeBlock;
