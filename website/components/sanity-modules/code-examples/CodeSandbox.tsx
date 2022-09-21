import { getParameters } from "codesandbox/lib/api/define";
import { EditFilled } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";

const indexTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "@navikt/ds-css";
import "@navikt/ds-css-internal";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`;

const getAppCode = (code: string) => {
  const lineWithFunctionName = code
    .split("\n")
    .filter((name) => name.match(/function .*Example/g))?.[0];
  const functionName = lineWithFunctionName
    ? lineWithFunctionName.replace("function ", "").replace("() {", "")
    : "Example";
  const exportLine = `export default ${functionName};`;
  let appCode = "";

  appCode += code;
  appCode += "\n";
  appCode += exportLine;

  return appCode;
};

export const CodeSandbox = ({ code }: { code: string }) => {
  const parameters = getParameters({
    files: {
      "package.json": {
        content: {
          dependencies: {
            react: "latest",
            "react-dom": "latest",
            "@shopify/polaris": "latest",
            "@shopify/polaris-icons": "latest",
          },
        } as any,
        isBinary: false,
      },
      "App.js": {
        content: getAppCode(code),
        isBinary: false,
      },
      "index.js": {
        content: indexTsx,
        isBinary: false,
      },
      "index.html": {
        content: '<div id="root"></div>',
        isBinary: false,
      },
    },
  });

  return (
    <Button icon={<EditFilled aria-hidden />} size="small" variant="tertiary">
      CodeSandbox
    </Button>
  );
};
