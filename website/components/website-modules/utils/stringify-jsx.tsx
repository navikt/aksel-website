import React from "react";
import reactElementToJSXString from "react-element-to-jsx-string";

export const stringifyJsx = (renderedCode: React.ReactElement) => {
  let Type = renderedCode.type;
  let depth = 0;

  while (typeof Type === "function" && Type.name === "") {
    renderedCode = <Type {...renderedCode.props} />;
    Type = renderedCode.type;
    depth += 1;
    if (depth > 20) {
      console.log(`Max iteration-depth reached`);
      break;
    }
  }

  let result = React.Children.map(renderedCode, (c) => {
    let string = reactElementToJSXString(c, {
      showFunctions: true,
      useFragmentShortSyntax: true,
      functionValue: (fn) =>
        fn?.displayName ? `Replacewith:{${fn?.displayName}}` : fn,
    });

    const matches = string.match(/\S+=\\"([^"]*)\\"/g);

    if (matches) {
      matches.forEach((match) => {
        string = string.replace(match, match.replace(/&quot;/g, "'"));
      });
    }

    return string;
  }).join("\n");

  const reg = RegExp(/as={{(([^}][^}]?|[^}]}?)*)}}/);
  const regReplace = RegExp(/Replacewith:\{([^}]+)\}/);

  depth = 0;
  while (result.match(reg)) {
    result = result.replace(reg, `as={${result.match(regReplace)?.[1]}}`);
    depth += 1;
    if (depth > 20) {
      console.log(`Max iteration-depth reached for as-prop replace`);
      break;
    }
  }

  return result;
};
