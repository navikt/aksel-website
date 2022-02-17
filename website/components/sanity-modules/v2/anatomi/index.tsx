import { Label } from "@navikt/ds-react";
import React from "react";
import { LevelTwoHeading } from "../../..";
import { AnatomiSeksjon } from "../../../../lib";
import { withErrorBoundary } from "../../../ErrorBoundary";
import { SanityBlockContent } from "../../../SanityBlockContent";
import { Bilde } from "../bilde";

const Anatomi = ({ node }: { node: AnatomiSeksjon }): JSX.Element => {
  if (!node || !node.bilde || !node.title) {
    return null;
  }

  return (
    <div className="my-16">
      <LevelTwoHeading>{[node.title]}</LevelTwoHeading>
      <SanityBlockContent blocks={node.forklaring} />
      <Bilde node={node.bilde} />
      {node?.forklaring && (
        <ul>
          {node.forklaring.map((x) => (
            <li key={x._key}>
              <Label as="span">{x.element}</Label>
              <SanityBlockContent
                className="ml-[18px]"
                blocks={x?.beskrivelse}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default withErrorBoundary(Anatomi, "Anatomi");
