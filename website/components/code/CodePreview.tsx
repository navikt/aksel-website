import { useContext, useEffect, useRef, useState } from "react";
import { CodeContext } from "./Code";

const CodePreview = (): JSX.Element => {
  const { previewToggles: tmpPreviewToggles } = useContext(CodeContext);
  const [previewToggles] = tmpPreviewToggles;
  const iframeRef = useRef(null);

  const [height, setHeight] = useState(200);
  const [loaded, setLoaded] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");

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
    const toggles = previewToggles.ruler ? `globals=measureEnabled:true` : "";
    setIframeUrl(
      `/storybook/iframe.html?id=example-button--primary-button&${toggles}&args=&viewMode=story`
    );
  }, [previewToggles.ruler]);

  return (
    <iframe
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
