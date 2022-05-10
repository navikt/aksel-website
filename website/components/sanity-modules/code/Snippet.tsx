import cl from "classnames";
import Prism from "prismjs";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import React, { useEffect, useState } from "react";
import { CodeSnippet as CodeSnippetT, Kode } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import CopyButton from "./CopyButton";

const CodeSnippet = ({
  node: { code },
  className,
  ...props
}: {
  node: CodeSnippetT | Kode;
  className?: string;
  style?: any;
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
      <div
        className={cl(
          className,
          "relative mb-8 block max-h-80 overflow-x-auto rounded-md bg-gray-900"
        )}
        {...props}
      >
        <CopyButton content={code.code} />
        <pre className="language- m-0 flex min-h-[5rem] items-center overflow-x-auto p-4">
          <code
            className={cl("language- text-medium text-text-inverted", {
              "before:content-['$ ']": language === "bash",
            })}
            dangerouslySetInnerHTML={{ __html: highlightedCode ?? code.code }}
          />
        </pre>
      </div>
    </>
  );
};

export default withErrorBoundary(CodeSnippet, "Kode snippet");
