import { useContext, useEffect, useState } from "react";
import { CodeContext } from "./Example";
import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";
import CodeExample from "./getCodeExample";
import { useId } from "@navikt/ds-react";
import styled from "styled-components";
import React from "react";

/**
 *
 * @param code Code to format
 * @param tag Tag to wrap code in. Defaults to <></>
 * @returns string
 */
const formatCode = (code: string, tag: string) => {
  try {
    const formated = prettier.format(`<${tag ?? ""}>${code}</${tag ?? ""}>`, {
      parser: "babel",
      plugins: [babel],
      printWidth: 60,
      semi: false,
    });

    return formated.startsWith(";") ? formated.slice(1) : formated;
  } catch {
    return code;
  }
};

const ScDiv = styled.div`
  display: flex;
  width: 100%;
  background-color: #f7f7f7;
  border: 1px solid var(--navds-color-gray-20);
  border-bottom: 1px solid var(--navds-color-gray-20);
  border-top: none;
  overflow-x: auto;

  :only-child {
    border-top: 1px solid var(--navds-color-gray-20);
  }
`;

const ScInnerDiv = styled.div`
  gap: 1rem;
  padding: 2rem;
  display: inline-flex;
  flex-wrap: wrap;
`;

const CodePreview = (): JSX.Element => {
  const { node, setTabs, setFullscreenLink } = useContext(CodeContext);

  const [url, setUrl] = useState<string>();
  const id = useId();
  const [wrapperRef, setWrapperRef] = useState(null);

  useEffect(() => {
    const url = node.preview.split("/examples/")?.[1];
    if (url) {
      setFullscreenLink(`/examples/${url}`);
      setUrl(url.replaceAll("/", "-"));
    }
  }, [node.preview]);

  useEffect(() => {
    if (!node.infercode || !wrapperRef || !CodeExample(url)) return;

    const newTabs = [];
    // {react?: string, html?: string}
    const { ...rest }: any = CodeExample(url);

    rest?.react &&
      newTabs.push({
        name: "React",
        content: formatCode(rest.react, ""),
        language: "jsx",
      });

    if (rest?.html === undefined) {
      wrapperRef &&
        newTabs.push({
          name: "HTML",
          content: formatCode(wrapperRef.innerHTML, "div"),
          language: "html",
        });
    } else if (rest?.html !== null) {
      rest?.html &&
        newTabs.push({
          name: "HTML",
          content: formatCode(rest.html, "div"),
          language: "html",
        });
    }
    newTabs && setTabs([...newTabs]);
  }, [id, wrapperRef, url]);

  if (!url) return null;

  const Comp = CodeExample(url);

  return (
    <>
      {Comp && (
        <ScDiv>
          <ScInnerDiv ref={setWrapperRef}>
            <Comp />
          </ScInnerDiv>
        </ScDiv>
      )}
    </>
  );
};

export default CodePreview;
