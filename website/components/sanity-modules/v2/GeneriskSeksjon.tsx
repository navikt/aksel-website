import React from "react";
import { LevelTwoHeading, SectionContext } from "../..";
import { GeneriskSeksjon as GeneriskSeksjonT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import { SanityBlockContent } from "../../SanityBlockContent";

const GeneriskSeksjon = ({ node }: { node: GeneriskSeksjonT }): JSX.Element => {
  if (!node || !node.title || node?.brikker?.length === 0) {
    return null;
  }

  return (
    <div className="aksel-artikkel__child mb-16">
      <LevelTwoHeading>{[node.title]}</LevelTwoHeading>
      <SectionContext.Provider value={{ withinSection: true }}>
        <SanityBlockContent blocks={node.brikker} />
      </SectionContext.Provider>
    </div>
  );
};

export default withErrorBoundary(GeneriskSeksjon, "GeneriskSeksjon");
