import { useContext, useEffect, useState } from "react";
import { CodeContext } from "./Example";
import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";
import CodeExample from "./getCodeExample";
import { Detail, useId } from "@navikt/ds-react";
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
    console.error(e);
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

  :only-child {
    border-top: 1px solid var(--navds-global-color-gray-200);
  }
`;

const ScInnerDiv = styled.div`
  gap: 1rem;
  padding: 2rem;
  display: inline-flex;
  align-items: baseline;
  flex-wrap: wrap;
  width: 100%;

  &[data-bg="white"] {
    background-color: var(--navds-semantic-color-canvas-background-light);
  }

  &[data-bg="default"] {
    background-color: var(
      --navds-semantic-color-component-background-alternate
    );
  }
  &[data-bg="inverted"] {
    background-color: var(--navds-semantic-color-canvas-background-inverted);
  }
`;

const ScBgText = styled(Detail)`
  position: absolute;
  top: var(--navds-spacing-2);
  right: var(--navds-spacing-4);
  color: var(--navds-semantic-color-text-muted);

  &[data-bg="inverted"] {
    color: var(--navds-semantic-color-text-inverted);
  }
`;

const CodePreview = (): JSX.Element => {
  const {
    node,
    setTabs,
    setFullscreenLink,
    previewBg,
    setPreviewBg,
    showTabs,
  } = useContext(CodeContext);

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

  const getBgName = () => {
    switch (previewBg) {
      case "white":
        return "canvas-background-light";
      case "default":
        return "component-background-alternate";
      case "inverted":
        return "canvas-background-inverted";
      default:
        return "";
    }
  };

  const Comp = CodeExample(url);

  return (
    <>
      {Comp && (
        <ScDiv>
          {showTabs && (
            <ScBgText size="small" data-bg={previewBg}>
              {getBgName()}
            </ScBgText>
          )}
          <ScInnerDiv data-bg={previewBg} ref={setWrapperRef}>
            <Comp />
          </ScInnerDiv>
        </ScDiv>
      )}
    </>
  );
};

export default CodePreview;
