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
    <div
      data-html
      style={{ display: "inline-flex", gap: "1rem", alignItems: "center" }}
    >
      {children}
    </div>
  );
};
