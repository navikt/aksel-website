import { useState } from "react";

const CodePreview = () => {
  const [height, setHeight] = useState(200);
  const [ruler, setRuler] = useState(false);

  const handleHeight = () => {
    const newHeight = (document.getElementById("iframe") as HTMLIFrameElement)
      ?.contentWindow.document.body.scrollHeight;

    setHeight(newHeight);
  };

  function addOutlines() {
    setRuler(true);
    (
      document.getElementById("iframe") as HTMLIFrameElement
    )?.contentWindow.document.body.classList.add("sb--outlines");
  }

  function removeOutlines() {
    setRuler(false);
    (
      document.getElementById("iframe") as HTMLIFrameElement
    )?.contentWindow.document.body.classList.remove("sb--outlines");
  }

  const globals = ruler ? `globals=measureEnabled:true` : "";

  const prod = `/storybook/iframe.html?id=example-button--primary-button&args=&${globals}&args=`;
  /* const preview =
    "http://localhost:6006/iframe.html?id=example-button--primary&globals=measureEnabled:true&args="; */

  return (
    <iframe
      id="iframe"
      onLoad={handleHeight}
      src={prod}
      height={height + "px"}
      width="100%"
      style={{ border: "none" }}
    />
  );
};

export default CodePreview;
