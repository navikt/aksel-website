import { useContext, useEffect, useState } from "react";
import { CodeContext } from "./Example";
import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";
import { CodePreviews } from "./code-previews";
import { useId } from "@navikt/ds-react";
import styled from "styled-components";
import React from "react";

const formatCode = (code, tag) => {
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

const Wrapper = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerWrapper = styled.div`
  gap: 1rem;
  align-items: "center";
  flex-wrap: wrap;
  display: inline-grid;
  align-items: center;
`;

const CodePreview = (): JSX.Element => {
  const { node, setTabs, setFullscreenLink } = useContext(CodeContext);

  const [url, setUrl] = useState<any>();
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
    if (!node.infercode || !wrapperRef || !CodePreviews(url)) return;

    const newTabs = [];

    /* const html = wrapperRef.querySelector("[data-html-wrapper]");
    const inferHtml = wrapperRef.querySelector("[data-html]"); */

    // {react?: string, html?: string}
    const { ...rest }: any = CodePreviews(url);

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

  const Comp = CodePreviews(url);

  return (
    <Wrapper>
      <InnerWrapper ref={setWrapperRef}>
        <Comp />
      </InnerWrapper>
    </Wrapper>
  );
};

export default CodePreview;
