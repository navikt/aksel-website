import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CodeContext } from "./Code";

const CodePreview = (): JSX.Element => {
  const { node, setTabs, previews } = useContext(CodeContext);

  const iframeRef = useRef(null);
  const [height, setHeight] = useState(200);
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
        content: react.textContent,
        language: "jsx",
      });
    html &&
      newTabs.push({ name: "HTML", content: html.innerHTML, language: "html" });
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
