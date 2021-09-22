import React from "react";
import Code from "./Code";

const ParseCodeRef = ({ node }: { node: any }): JSX.Element => {
  return node.ref && node.ref.preview ? <Code node={node.ref} /> : null;
};

export default ParseCodeRef;
