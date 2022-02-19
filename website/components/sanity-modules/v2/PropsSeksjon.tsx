import React from "react";
import { LevelTwoHeading, PropTable } from "../..";
import { PropsSeksjon as PropsSeksjonT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";

const PropsSeksjon = ({ node }: { node: PropsSeksjonT }): JSX.Element => {
  if (!node || node?.elementer?.length === 0) {
    return null;
  }

  return (
    <div className="my-16">
      <LevelTwoHeading>{[node.title]}</LevelTwoHeading>
      {node.elementer.map((prop) => (
        <PropTable node={prop} key={prop?._key} />
      ))}
    </div>
  );
};

export default withErrorBoundary(PropsSeksjon, "PropsSeksjon");
