import Prism from "prismjs";
import React, { useRef } from "react";
import { useMount } from "react-use";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import styled from "styled-components";
import CodeExample from "./CodeExample";
import { Title } from "@navikt/ds-react";
import { SanityBlockContent } from "../SanityBlockContent";

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

const Div = styled.div`
  width: 100%;
`;

const Pre = styled.pre`
  overflow-x: auto;
  font-family: var(--navds-font-family);
`;

const Code = ({ node }) => {
  const ref = useRef<HTMLElement | null>(null);
  useMount(
    () =>
      node.codeExample?.code && Prism.highlightElement(ref.current as Element)
  );

  return (
    <Div>
      <Title spacing level={2} size="xl">
        {node.title}
      </Title>
      {node.body && <SanityBlockContent blocks={node.body} />}
      {node.code_preview && <CodeExample component={node.code_preview} />}
      {node.codeExample?.code && (
        <div>
          <Pre>
            <code
              ref={ref}
              className={`language-${
                node.codeExample?.language ? node.codeExample.language : "jsx"
              }`}
            >
              {node.codeExample.code}
            </code>
          </Pre>
        </div>
      )}
    </Div>
  );
};

export default Code;
