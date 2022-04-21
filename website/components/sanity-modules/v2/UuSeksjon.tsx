import { Heading, Table } from "@navikt/ds-react";
import React from "react";
import { LevelTwoHeading } from "../..";
import { UuSeksjon as UuSeksjonT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import { SanityBlockContent } from "../../SanityBlockContent";
import cl from "classnames";

const KBD = (props: React.HTMLAttributes<HTMLElement>) => (
  <kbd
    className={cl(
      "my-0 mx-1 inline-block min-w-[2rem] rounded border-2 border-gray-900 bg-white py-1 px-2 text-center text-medium text-text shadow-[1px_1px_0_0_var(--navds-global-color-gray-800)]",
      "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
    )}
    {...props}
  />
);

const UuSeksjon = ({ node }: { node: UuSeksjonT }): JSX.Element => {
  if (!node || !node.title) {
    return null;
  }

  const getKey = (s: string) => (
    <span className="flex w-full flex-wrap gap-x-1 gap-y-3">
      {s
        .trim()
        .split(" ")
        .map((x) => (
          <KBD key={x}>{x}</KBD>
        ))}
    </span>
  );

  return (
    <div className="mb-16">
      <LevelTwoHeading>{[node.title]}</LevelTwoHeading>
      {node?.interaksjon_mus && (
        <Heading level="3" size="medium">
          Interaksjon Mus
        </Heading>
      )}
      <SanityBlockContent blocks={node.interaksjon_mus} />
      {node?.interaksjon_touch && (
        <Heading level="3" size="medium">
          Interaksjon Touch
        </Heading>
      )}
      <SanityBlockContent blocks={node.interaksjon_touch} />
      {(node?.interaksjon_tastatur || node?.tastatur) && (
        <Heading level="3" size="medium">
          Interaksjon Tastatur
        </Heading>
      )}
      <SanityBlockContent blocks={node.interaksjon_tastatur} />

      {node?.tastatur && (
        <Table className="mb-7">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="font-normal text-text-muted">
                Kommando
              </Table.HeaderCell>
              <Table.HeaderCell className="font-normal text-text-muted">
                Beskrivelse
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {node.tastatur.map((x) => (
              <Table.Row key={x._key}>
                <Table.DataCell>{getKey(x.key)}</Table.DataCell>
                <Table.DataCell>{x.action}</Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      {node?.interaksjon_skjermleser && (
        <Heading level="3" size="medium">
          Interaksjon Skjermleser
        </Heading>
      )}
      <SanityBlockContent blocks={node.interaksjon_skjermleser} />
    </div>
  );
};

export default withErrorBoundary(UuSeksjon, "UuSeksjon");
