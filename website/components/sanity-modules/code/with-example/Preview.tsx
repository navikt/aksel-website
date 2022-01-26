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
  } catch (e) {
    return code;
  }
};

const ScDiv = styled.div`
  display: flex;
  width: 100%;
  background-color: var(--navds-global-color-gray-50);
  border: 1px solid var(--navds-global-color-gray-200);
  border-bottom: 1px solid var(--navds-global-color-gray-200);
  border-top: none;
  overflow-x: auto;
  position: relative;

  border-top: 1px solid var(--navds-semantic-color-divider);
`;

const ScInnerDiv = styled.div<{ bg?: string }>`
  gap: 1rem;
  padding: 2rem;
  display: inline-flex;
  align-items: baseline;
  flex-wrap: wrap;
  width: 100%;

  ${(props) => props.bg && `background-color: var(${props.bg});`}
`;

const CodePreview = (): JSX.Element => {
  const { node, setTabs, setFullscreenLink, previewBg, setPreviewBg } =
    useContext(CodeContext);

  const [url, setUrl] = useState<string>();
  const id = useId();
  const [wrapperRef, setWrapperRef] = useState(null);

  useEffect(() => {
    const url = node.preview.split("/examples/")?.[1];
    if (url) {
      setFullscreenLink(`/designsystem/examples/${url}`);
      setUrl(url.replaceAll("/", "-"));
    }
  }, [node.preview]);

  useEffect(() => {
    if (!node.infercode || !wrapperRef || !CodeExample(url)) return;

    const newTabs = [];

    const { react, html, bg } = CodeExample(url);

    bg && setPreviewBg(bg);

    react &&
      newTabs.push({
        name: "React",
        content: formatCode(react, ""),
        language: "jsx",
      });

    if (html === undefined) {
      wrapperRef &&
        newTabs.push({
          name: "HTML",
          content: formatCode(wrapperRef.innerHTML, "div"),
          language: "html",
        });
    } else if (html && html !== "") {
      html &&
        newTabs.push({
          name: "HTML",
          content: formatCode(html, "div"),
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
          <ScInnerDiv bg={previewBg} ref={setWrapperRef}>
            <Comp />
          </ScInnerDiv>
        </ScDiv>
      )}
    </>
  );
};

export default CodePreview;
