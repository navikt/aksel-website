import React from "react";

const PreviewReact = ({ children }) => {
  return (
    <div aria-hidden="true" data-react style={{ display: "none" }}>
      {children}
    </div>
  );
};

export default PreviewReact;
