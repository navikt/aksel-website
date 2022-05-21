import React from "react";
import { LevelTwoHeading } from "../../..";
import { PropsSeksjon as PropsSeksjonT } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import PropTableV2, { PropT } from "./PropTabell";

const PropsSeksjon = ({ node }: { node: PropsSeksjonT }): JSX.Element => {
  if (
    !node ||
    (node?.elementer?.length === 0 && node?.komponenter?.length === 0)
  ) {
    return null;
  }

  return (
    <div className="mb-16">
      <LevelTwoHeading>{[node.title]}</LevelTwoHeading>
      {node?.komponenter?.length > 0 && (
        <>
          {node.komponenter.map((prop) => (
            <PropTableV2
              komponent={prop as unknown as PropT}
              key={prop?._key}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default withErrorBoundary(PropsSeksjon, "PropsSeksjon");
