import Prism from "prismjs";
import { useRef } from "react";
import { useMount } from "react-use";
import "prismjs/components/prism-jsx.min";
import styled from "styled-components";

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
    <div>
      <Pre>
        <code ref={ref} className={"language-" + node.codeExample.language}>
          {node.codeExample.code}
        </code>
      </Pre>
    </div>
  );
};

export default Bash;
