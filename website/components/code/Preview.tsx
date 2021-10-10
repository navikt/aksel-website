import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CodeContext } from "./Example";
import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";

const CodePreview = (): JSX.Element => {
  const { node, setTabs } = useContext(CodeContext);

  const iframeRef = useRef(null);
  const [height, setHeight] = useState(120);
  const [loaded, setLoaded] = useState(false);
  const [url, setUrl] = useState<string | undefined>();

  useLayoutEffect(() => {
    const url = node.preview.split("/")?.[1];
    url && setUrl(url);
  }, [node.preview]);

  useEffect(() => {
    setLoaded(false);
  }, [url]);

  /* Resizes height if content changes, example accordion */
  useEffect(() => {
    if (!loaded) return;
    const newHeight =
      iframeRef.current?.contentWindow.document.body.scrollHeight;
    setHeight(newHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      const newHeight = entries[0].target.scrollHeight;
      setHeight(newHeight);
    });

    resizeObserver.observe(iframeRef.current?.contentWindow.document.body);
    return () => {
      resizeObserver.disconnect();
    };
  }, [loaded]);

  const formatCode = (code, tag) => {
    try {
      const formated = prettier.format(`<${tag ?? ""}>${code}</${tag ?? ""}>`, {
        parser: "babel",
        plugins: [babel],
        printWidth: 60,
        semi: false,
      });
      /* Prettier puts a semicolon at start of each html/jsx block... */
      return formated.startsWith(";") ? formated.slice(1) : formated;
    } catch {
      return code;
    }
  };

  useEffect(() => {
    if (!loaded || !node.infercode) return;

    const newTabs = [];

    const react =
      iframeRef.current?.contentWindow.document.querySelector("[data-react]");
    const html = iframeRef.current?.contentWindow.document.querySelector(
      "[data-html-wrapper]"
    );
    const inferHtml =
      iframeRef.current?.contentWindow.document.querySelector("[data-html]");

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
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    const handleResize = () => {
      if (!iframeRef.current) return;
      const width = iframeRef.current.offsetWidth;
      const doc: Document = iframeRef.current?.contentWindow.document;
      if (doc) {
        doc.body.style.width = `${width}px`;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [loaded]);

  return (
    <iframe
      title="Iframe for komponent eksempel"
      ref={iframeRef}
      onLoad={() => setLoaded(true)}
      src={url}
      height={height + "px"}
      width="100%"
      style={{ border: "none" }}
      loading="lazy"
    />
  );
};

export default CodePreview;
