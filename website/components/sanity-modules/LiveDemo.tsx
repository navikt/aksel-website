import { Sandbox } from "@/components";
import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";
import React from "react";

const LiveDemo = ({
  node,
}: {
  node: SanityT.Schema.live_demo;
}): JSX.Element => {
  if (!node || !node.sandbox_ref) {
    return null;
  }

  return (
    <div className="mb-16">
      <Sandbox node={node.sandbox_ref as any} />
    </div>
  );
};

export default withErrorBoundary(LiveDemo, "LiveDemO");
