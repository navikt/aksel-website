import Highlight, { defaultProps } from "prism-react-renderer";
import CopyButton from "../code/CopyButton";

export const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative mt-2 animate-fadeIn rounded">
    <Highlight code={code} language="jsx" {...defaultProps} theme={undefined}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="relative m-0 flex max-h-[300px] min-h-20 flex-col justify-center overflow-x-auto overflow-y-auto  rounded-lg bg-gray-900 p-4 pr-20 font-mono text-text-inverted">
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
          <CopyButton content={code} inTabs={false} />
        </pre>
      )}
    </Highlight>
  </div>
);
