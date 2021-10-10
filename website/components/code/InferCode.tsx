import React from "react";

export const InferReact = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div aria-hidden="true" data-react style={{ display: "none" }}>
      {children}
    </div>
  );
};

export const InferHtml = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div aria-hidden="true" data-html style={{ display: "none" }}>
      {children}
    </div>
  );
};

export const HtmlWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
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

export const PreviewWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
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
