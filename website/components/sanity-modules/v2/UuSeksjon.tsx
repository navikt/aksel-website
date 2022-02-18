import { Table } from "@navikt/ds-react";
import React from "react";
import { LevelTwoHeading } from "../..";
import { UuSeksjon as UuSeksjonT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import { KBD, SanityBlockContent } from "../../SanityBlockContent";

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
    <div className="my-16">
      <LevelTwoHeading>{[node.title]}</LevelTwoHeading>
      <SanityBlockContent blocks={node.interaksjon_mus} />
      <SanityBlockContent blocks={node.interaksjon_touch} />
      <SanityBlockContent blocks={node.interaksjon_tastatur} />

      {node.tastatur && (
        <Table>
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
      <SanityBlockContent blocks={node.interaksjon_skjermleser} />
    </div>
  );
};

export default withErrorBoundary(UuSeksjon, "UuSeksjon");
