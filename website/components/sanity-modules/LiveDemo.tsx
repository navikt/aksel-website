import React from "react";
import { CodeExample, LevelTwoHeading, Sandbox } from "@/components";
import { LiveDemoSeksjon } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";

const LiveDemo = ({ node }: { node: LiveDemoSeksjon }): JSX.Element => {
  if (
    !node ||
    (node.erstatt && !node.code_ref) ||
    (!node.erstatt && !node.sandbox_ref)
  ) {
    return null;
  }

  return (
    <div className="mb-16">
      <LevelTwoHeading>{["Demo"]}</LevelTwoHeading>
      <SanityBlockContent blocks={node.body} />
      {node?.erstatt ? (
        <CodeExample node={node.code_ref as any} />
      ) : (
        <Sandbox node={node.sandbox_ref as any} />
      )}
    </div>
  );
};

export default withErrorBoundary(LiveDemo, "LiveDemO");
