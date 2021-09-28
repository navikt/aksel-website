import React from "react";

export const InferReact = ({ children }) => {
  return (
    <div aria-hidden="true" data-react style={{ display: "none" }}>
      {children}
    </div>
  );
};

export const InferHtml = ({ children }) => {
  return (
    <div aria-hidden="true" data-html style={{ display: "none" }}>
      {children}
    </div>
  );
};

export const HtmlWrapper = ({ children }) => {
  return (
    <div
      data-html-wrapper
      style={{
        display: "inline-flex",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
};

export const PreviewWrapper = ({ children }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
};
