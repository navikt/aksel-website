import React from "react";
import { LevelTwoHeading } from "../../..";
import { GeneriskSeksjon as GeneriskSeksjonT } from "../../../../lib";
import { withErrorBoundary } from "../../../ErrorBoundary";
import { SanityBlockContent } from "../../../SanityBlockContent";

const GeneriskSeksjon = ({ node }: { node: GeneriskSeksjonT }): JSX.Element => {
  if (!node || !node.title || !(node?.brikker?.length === 0)) {
    return null;
  }

  return (
    <div className="my-16">
      <LevelTwoHeading>{[node.title]}</LevelTwoHeading>
      <SanityBlockContent blocks={node.brikker} />
    </div>
  );
};

export default withErrorBoundary(GeneriskSeksjon, "GeneriskSeksjon");
