import Highlight, { defaultProps } from "prism-react-renderer";
import CopyButton from "../code/CopyButton";
import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";

const formatCode = (code: string) => {
  try {
    const formated = prettier.format(`${code}`, {
      parser: "babel",
      plugins: [babel],
      printWidth: 60,
      semi: false,
    });
    return formated.startsWith(";")
      ? formated.slice(1).trim()
      : formated.trim();
  } catch (e) {
    console.log(e);
    return code;
  }
};

const CodeBlock = ({ code }: { code: string }) => {
  const formated = formatCode(code);
  return (
    <div className="relative mt-2 animate-fadeIn rounded">
      <Highlight
        code={formated}
        language="jsx"
        {...defaultProps}
        theme={undefined}
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="relative m-0 max-h-[300px] min-h-20 overflow-x-auto overflow-y-auto  rounded-lg bg-gray-900 p-4 pr-20 font-mono text-text-inverted">
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                className="whitespace-pre-wrap break-words"
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
            <CopyButton content={formated} inTabs={false} />
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
