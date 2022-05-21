import { useContext, useEffect, useState } from "react";
import { CodeContext } from "./Example";
import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";
import CodeExample from "./getCodeExample";
import { useId } from "@navikt/ds-react";
import React from "react";
import { getBgColors } from "../../../../../stories/sandbox/types";

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

  const bgt = getBgColors(previewBg);

  return (
    <>
      {Comp && (
        <div
          role="presentation"
          className="relative flex w-full overflow-x-auto border border-gray-200 bg-gray-50"
        >
          <div
            ref={setWrapperRef}
            style={bgt}
            className="inline-flex w-full flex-wrap items-baseline gap-4 p-8"
          >
            <Comp />
          </div>
        </div>
      )}
    </>
  );
};

export default CodePreview;
