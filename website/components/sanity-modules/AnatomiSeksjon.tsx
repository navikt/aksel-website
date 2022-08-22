import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { Label } from "@navikt/ds-react";
import React from "react";
import { Bilde } from "..";

const Anatomi = ({ node }: { node: SanityT.Schema.anatomi }): JSX.Element => {
  if (!node || !node.bilde) {
    return null;
  }

  return (
    <div className="mb-16">
      <Bilde node={node.bilde} />
      {node?.forklaring && (
        <ul>
          {node.forklaring.map((x) => (
            <li
              key={x._key}
              className="mb-3 list-item max-w-[calc(theme(spacing.text)_-_1em)]"
            >
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
    </div>
  );
};

export default withErrorBoundary(Anatomi, "Anatomi");
