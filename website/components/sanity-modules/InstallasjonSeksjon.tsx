import React from "react";
import { CodeExample, LevelTwoHeading } from "../..";
import {
  DsCodeExample,
  InstallasjonSeksjon as InstallasjonSeksjonT,
} from "@/lib";
import { withErrorBoundary } from "@/error-boundary";

const InstallasjonSeksjon = ({
  node,
}: {
  node: InstallasjonSeksjonT;
}): JSX.Element => {
  if (!node || !node.code_ref) {
    return null;
  }

  return (
    <div className="mb-16">
      <LevelTwoHeading>{[node.title]}</LevelTwoHeading>
      <CodeExample node={node.code_ref as unknown as DsCodeExample} />
    </div>
  );
};

export default withErrorBoundary(InstallasjonSeksjon, "InstallasjonSeksjon");
