import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";
import { Table } from "@navikt/ds-react";
import cl from "classnames";
import React from "react";

const KBD = (props: React.HTMLAttributes<HTMLElement>) => (
  <kbd
    className={cl(
      "my-0 mx-1 inline-block min-w-[2rem] rounded border-2 border-gray-900 bg-white py-1 px-2 text-center text-medium text-text shadow-[1px_1px_0_0_var(--navds-global-color-gray-800)]",
      "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
    )}
    {...props}
  />
);

const UuSeksjon = ({
  node,
}: {
  node: SanityT.Schema.tastatur_modul;
}): JSX.Element => {
  if (!node || !node?.tastatur) {
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
    <Table className="mb-8">
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
  );
};

export default withErrorBoundary(UuSeksjon, "UuSeksjon");
