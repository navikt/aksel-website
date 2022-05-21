import React from "react";
import { LevelTwoHeading, SectionContext } from "../..";
import { GeneriskSeksjon as GeneriskSeksjonT } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";

const GeneriskSeksjon = ({ node }: { node: GeneriskSeksjonT }): JSX.Element => {
  if (!node || !node.title || node?.brikker?.length === 0) {
    return null;
  }

  return (
    <div className="aksel-artikkel__child mb-10">
      <LevelTwoHeading>{[node.title]}</LevelTwoHeading>
      <SectionContext.Provider value={{ withinSection: true }}>
        <SanityBlockContent blocks={node.brikker} />
      </SectionContext.Provider>
    </div>
  );
};

export default withErrorBoundary(GeneriskSeksjon, "GeneriskSeksjon");
