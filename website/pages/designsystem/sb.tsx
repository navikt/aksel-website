import { useState } from "react";

const StorybookFrame = (): JSX.Element => {
  const [height, setHeight] = useState(200);

  const handleHeight = () => {
    const newHeight = (document.getElementById("iframe") as HTMLIFrameElement)
      ?.contentWindow.document.body.scrollHeight;
    setHeight(newHeight);
  };

  const prod =
    "/docs/iframe.html?id=example-button--primary&globals=measureEnabled:true&args=";
  /* const preview =
    "http://localhost:6006/iframe.html?id=example-button--primary&globals=measureEnabled:true&args="; */

  return (
    <div>
      <iframe
        id="iframe"
        onLoad={handleHeight}
        src={prod}
        height={height + "px"}
        width="100%"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default StorybookFrame;
