import { Label } from "@navikt/ds-react";
import React from "react";
import { LevelTwoHeading } from "../..";
import { IntroKomponentSeksjon } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import { SanityBlockContent } from "../../SanityBlockContent";

const Intro = ({ node }: { node: IntroKomponentSeksjon }): JSX.Element => {
  if (!node || !node.body || !node.brukes_til) {
    return null;
  }

  return (
    <div className="mb-16">
      <LevelTwoHeading hidden>{["Intro"]}</LevelTwoHeading>
      <SanityBlockContent blocks={node.body} />
      <div className="flex flex-col gap-7">
        <div>
          <Label className="mb-2">Egnet til:</Label>
          <ul className="list-disc">
            {node.brukes_til.map((x) => (
              <li key={x} className="ml-5 list-item">
                {x}
              </li>
            ))}
          </ul>
        </div>
        {node?.brukes_ikke_til && (
          <div>
            <Label className="mb-2">Når bør man vurdere noe annet:</Label>
            <ul className="list-disc">
              {node.brukes_ikke_til.map((x) => (
                <li key={x} className="ml-5 list-item">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default withErrorBoundary(Intro, "Intro komponent");
