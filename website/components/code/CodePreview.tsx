import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CodeContext } from "./Code";

const CodePreview = (): JSX.Element => {
  const {
    node,
    previewToggles: tmpPreviewToggles,
    tabs,
  } = useContext(CodeContext);
  const [previewToggles] = tmpPreviewToggles;
  const iframeRef = useRef(null);

  const [height, setHeight] = useState(200);
  const [loaded, setLoaded] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [baseUrl, setBaseUrl] = useState("");

  const [tabContent, setTabContent] = useState({ react: "", html: "" });

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

    previewToggles.outline
      ? iframeRef.current?.contentWindow.document.body.classList.add(
          "sb--outlines"
        )
      : iframeRef.current?.contentWindow.document.body.classList.remove(
          "sb--outlines"
        );
  }, [loaded, previewToggles.outline]);

  useEffect(() => {
    if (!loaded) return;
    const element =
      iframeRef.current?.contentWindow.document.getElementById("root");
    setTabContent({
      react: element.children[0].textContent,
      html: element.children[1].outerHTML,
    });
  }, [loaded]);

  useEffect(() => {
    tabs[1](
      Object.keys(tabContent).map((key, x) => ({
        title: key,
        content: tabContent[key],
        active: x === 0,
      }))
    );
  }, [tabContent]);

  // TODO: Forbedre state handling av iframes her? Laster sent etter side er rendret
  useEffect(() => {
    const toggles = previewToggles.ruler ? `globals=measureEnabled:true` : "";
    setIframeUrl(`${baseUrl}&${toggles}`);
  }, [previewToggles.ruler, baseUrl]);

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
