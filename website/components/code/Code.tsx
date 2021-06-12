import Prism from "prismjs";
import { useEffect, useRef } from "react";
import { useMount } from "react-use";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import styled from "styled-components";
import CodeExample from "./CodeExample";
import cl from "classnames";

const PrismLanguages = [
  "insertBefore",
  "DFS",
  "markup",
  "html",
  "mathml",
  "svg",
  "xml",
  "ssml",
  "atom",
  "rss",
  "css",
  "clike",
  "javascript",
  "js",
  "jsx",
];

const Pre = styled.pre`
  overflow-x: auto;
  font-family: var(--navds-font-family);
`;

const Bash = ({ node }) => {
  const ref = useRef<HTMLElement | null>(null);
  useMount(() => Prism.highlightElement(ref.current as Element));

  return (
    <>
      {node.code_preview && <CodeExample component={node.code_preview} />}
      <div>
        <Pre>
          <code ref={ref} className={`language-${node.codeExample.language}`}>
            {node.codeExample.code}
          </code>
        </Pre>
      </div>
    </>
  );
};

export default Bash;
