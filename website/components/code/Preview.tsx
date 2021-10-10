import { useContext, useEffect, useState } from "react";
import { CodeContext } from "./Example";
import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";
import { CodePreviews } from "./code-previews";
import { useId } from "@navikt/ds-react";
import styled from "styled-components";

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
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
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
    if (!node.infercode) return;

    const newTabs = [];
    if (!wrapperRef) return;

    const react = wrapperRef.querySelector("[data-react]");
    const html = wrapperRef.querySelector("[data-html-wrapper]");
    const inferHtml = wrapperRef.querySelector("[data-html]");

    react &&
      newTabs.push({
        name: "React",
        content: formatCode(react.textContent, ""),
        language: "jsx",
      });
    html &&
      newTabs.push({
        name: "HTML",
        content: formatCode(html.innerHTML, "div"),
        language: "html",
      });
    inferHtml &&
      newTabs.push({
        name: "HTML",
        content: formatCode(inferHtml.textContent, "div"),
        language: "html",
      });
    newTabs && setTabs([...newTabs]);
  }, [id, wrapperRef]);

  if (!url) return null;

  const Comp = CodePreviews(url);

  return <Wrapper ref={setWrapperRef}>{Comp}</Wrapper>;
};

export default CodePreview;
