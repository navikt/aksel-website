import { Label } from "@navikt/ds-react";
import React from "react";
import { LevelTwoHeading, Bilde } from "..";
import { AnatomiSeksjon } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";
import cl from "classnames";

const Anatomi = ({ node }: { node: AnatomiSeksjon }): JSX.Element => {
  if (!node || !node.bilde || !node.title) {
    return null;
  }

  return (
    <div className={cl({ "mb-16": !node?.nested, "my-7": node?.nested })}>
      {!node?.nested && <LevelTwoHeading>{[node.title]}</LevelTwoHeading>}
      <SanityBlockContent blocks={node.intro} />
      <Bilde node={node.bilde} />
      {node?.forklaring && (
        <ul>
          {node.forklaring.map((x) => (
            <li key={x._key} className="mb-2">
              <Label as="span">{x.element}</Label>
              <SanityBlockContent
                className="ml-[18px]"
                blocks={x?.beskrivelse}
                noLastMargin
              />
            </li>
          ))}
        </ul>
      )}
      {node.extra && node.extra.map((x, y) => <Anatomi key={y} node={x} />)}
    </div>
  );
};

export default withErrorBoundary(Anatomi, "Anatomi");
