import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CodeContext } from "./Code";
import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";

const CodePreview = (): JSX.Element => {
  const { node, setTabs, previews, setFullscreenLink } =
    useContext(CodeContext);

  const iframeRef = useRef(null);
  const [height, setHeight] = useState(180);
  const [loaded, setLoaded] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [baseUrl, setBaseUrl] = useState("");

  useLayoutEffect(() => {
    const url = node.preview.split("&")[0].match(/(?<=storybook\/)(.*\n?)/);
    if (url) {
      const newUrl =
        "/storybook/" + url[0].replace("index.html", "iframe.html");
      setBaseUrl(newUrl);
      setIframeUrl(newUrl);
      setFullscreenLink(newUrl);
    }
  }, [node.preview]);

  useEffect(() => {
    setLoaded(false);
  }, [iframeUrl]);

  useEffect(() => {
    if (!loaded) return;
    const newHeight =
      iframeRef.current?.contentWindow.document.body.scrollHeight;
    setHeight(newHeight);

    previews.outlines
      ? iframeRef.current?.contentWindow.document.body.classList.add(
          "sb--outlines"
        )
      : iframeRef.current?.contentWindow.document.body.classList.remove(
          "sb--outlines"
        );
  }, [loaded, previews.outlines]);

  /* Resizes height if content changes, example accordion */
  useEffect(() => {
    if (!loaded) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const newHeight = entries[0].target.scrollHeight;
      setHeight(newHeight);
    });

    resizeObserver.observe(iframeRef.current?.contentWindow.document.body);
    return () => {
      resizeObserver.disconnect();
    };
  }, [loaded, previews.outlines]);

  const formatCode = (code) => {
    try {
      const formated = prettier.format(code, {
        parser: "babel",
        plugins: [babylon],
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
    const html =
      iframeRef.current?.contentWindow.document.querySelector("[data-html]");

    react &&
      newTabs.push({
        name: "React",
        content: formatCode(react.textContent),
        language: "jsx",
      });
    html &&
      newTabs.push({
        name: "HTML",
        content: formatCode(html.innerHTML),
        language: "html",
      });
    newTabs && setTabs([...newTabs]);
  }, [loaded]);

  useEffect(() => {
    const toggles = previews.ruler ? `globals=measureEnabled:true` : "";
    setIframeUrl(`${baseUrl}&${toggles}`);
  }, [previews.ruler, baseUrl]);

  return (
    <iframe
      aria-label="Iframe for storybook-komponent eksempel"
      ref={iframeRef}
      onLoad={() => setLoaded(true)}
      src={iframeUrl}
      height={height + "px"}
      width="100%"
      style={{ border: "none" }}
    />
  );
};

export default CodePreview;
