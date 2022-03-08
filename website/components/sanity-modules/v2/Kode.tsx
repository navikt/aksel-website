import React from "react";
import { CodeExample, Snippet } from "../..";
import { DsCodeExample, Kode as KodeT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";

const Kode = ({ node }: { node: KodeT }): JSX.Element => {
  if (!node || (!node.variant && !node.code) || (node.variant && !node.ref)) {
    return null;
  }

  if (node.variant) {
    return (
      <div>
        <CodeExample node={node.ref as unknown as DsCodeExample} />
      </div>
    );
  } else {
    return (
      <div>
        <Snippet node={node} />
      </div>
    );
  }
};

export default withErrorBoundary(Kode, "Kode");
