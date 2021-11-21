import { BodyShort, Button, Heading, Table } from "@navikt/ds-react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { LayoutContext } from "..";
import { useRouter } from "next/router";
import { DsComponentOverview } from "../../lib/autogen-types";
import styled from "styled-components";

const ScComponentOverview = styled.div``;
const ScHeaderCell = styled(BodyShort)`
  color: var(--navds-semantic-color-text-muted);
`;

const ComponentOverview = ({
  node,
}: {
  node: DsComponentOverview;
}): JSX.Element => {
  /* const context = useContext(LayoutContext); */
  console.log(node);

  if (!node || !node.components) {
    return null;
  }
  node.components.map((comp) => console.log(comp));

  const TableRow = ({ comp }: { comp: any }) => {
    return (
      <Table.Row>
        <Table.HeaderCell>{comp.title}</Table.HeaderCell>
        <Table.DataCell>{comp.in_design + ""}</Table.DataCell>
        <Table.DataCell>{comp.in_code + ""}</Table.DataCell>
        <Table.DataCell>{comp.in_doc + ""}</Table.DataCell>
      </Table.Row>
    );
  };
  return (
    <ScComponentOverview>
      <Table>
        <Table.Header>
          <Table.Row>
            <ScHeaderCell size="small" forwardedAs={Table.HeaderCell}>
              Komponent
            </ScHeaderCell>
            <ScHeaderCell size="small" forwardedAs={Table.HeaderCell}>
              Design
            </ScHeaderCell>
            <ScHeaderCell size="small" forwardedAs={Table.HeaderCell}>
              Kode
            </ScHeaderCell>
            <ScHeaderCell size="small" forwardedAs={Table.HeaderCell}>
              Dok
            </ScHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {node.components.map((c) => (
            <TableRow key={c.title} comp={c} />
          ))}
        </Table.Body>
      </Table>
    </ScComponentOverview>
  );
};

export default ComponentOverview;
