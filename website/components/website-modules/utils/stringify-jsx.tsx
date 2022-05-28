import React from "react";
import reactElementToJSXString from "react-element-to-jsx-string";

export const stringifyJsx = (renderedCode: React.ReactElement) => {
  let Type = renderedCode.type;

  while (typeof Type === "function" && Type.name === "") {
    renderedCode = <Type {...renderedCode.props} />;
    Type = renderedCode.type;
  }

  return React.Children.map(renderedCode, (c) => {
    let string = reactElementToJSXString(c, {
      showFunctions: true,
      useFragmentShortSyntax: true,
      showDefaultProps: true,
    });

    const matches = string.match(/\S+=\\"([^"]*)\\"/g);

    if (matches) {
      matches.forEach((match) => {
        string = string.replace(match, match.replace(/&quot;/g, "'"));
      });
    }

    return string;
  }).join("\n");
};
