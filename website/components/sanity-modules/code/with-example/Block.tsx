import cl from "classnames";
import Highlight, { defaultProps } from "prism-react-renderer";
import React, { useContext } from "react";
import CopyButton from "../CopyButton";
import { CodeContext } from "./Example";

const CodeBlock = ({ index }: { index: number }): JSX.Element => {
  const { tabs, showTabs, activeTab, showPreview } = useContext(CodeContext);

  let language = (tabs[index].language as any) ?? "jsx";
  language =
    language === "terminal" || language === "default" ? "bash" : language;

  if (activeTab === -1) {
    return null;
  }

  return (
    <>
      <div
        className={cl("relative max-h-80 overflow-x-auto bg-gray-900", {
          block: activeTab === index,
          hidden: activeTab !== index,
          "rounded-md": !showPreview && !showTabs,
        })}
      >
        {!showPreview && !showTabs && (
          <CopyButton content={tabs[index].content.toString()} />
        )}
        <Highlight
          code={tabs[index].content as string}
          language={language}
          {...defaultProps}
          theme={undefined}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="relative m-0 min-h-[5rem] overflow-x-auto overflow-y-auto rounded-lg bg-gray-900 p-4 pr-20 font-mono text-text-inverted">
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  className="whitespace-pre-wrap break-words text-medium"
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </>
  );
};

export default CodeBlock;
