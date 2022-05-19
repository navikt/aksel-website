import React from "react";
import { Table } from "@navikt/ds-react";
import { ExampleComponent } from "../../lib";
import { BgColors } from "@/lib";

export const TableExample: ExampleComponent = () => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Fornavn</Table.HeaderCell>
          <Table.HeaderCell>Etternavn</Table.HeaderCell>
          <Table.HeaderCell>Rolle</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>1</Table.HeaderCell>
          <Table.DataCell>Jean-Luc</Table.DataCell>
          <Table.DataCell>Picard</Table.DataCell>
          <Table.DataCell>Kaptein</Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>2</Table.HeaderCell>
          <Table.DataCell>William</Table.DataCell>
          <Table.DataCell>Riker</Table.DataCell>
          <Table.DataCell>Kommandør</Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>3</Table.HeaderCell>
          <Table.DataCell>Geordi</Table.DataCell>
          <Table.DataCell>La Forge</Table.DataCell>
          <Table.DataCell>Sjefsingeniør</Table.DataCell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

TableExample.bg = BgColors.WHITE;
TableExample.react = `<Table>
<Table.Header>
  <Table.Row>
    <Table.HeaderCell>ID</Table.HeaderCell>
    <Table.HeaderCell>Fornavn</Table.HeaderCell>
    <Table.HeaderCell>Etternavn</Table.HeaderCell>
    <Table.HeaderCell>Rolle</Table.HeaderCell>
  </Table.Row>
</Table.Header>
<Table.Body>
  <Table.Row>
    <Table.HeaderCell>1</Table.HeaderCell>
    <Table.DataCell>Jean-Luc</Table.DataCell>
    <Table.DataCell>Picard</Table.DataCell>
    <Table.DataCell>Kaptein</Table.DataCell>
  </Table.Row>
  <Table.Row>
    <Table.HeaderCell>2</Table.HeaderCell>
    <Table.DataCell>William</Table.DataCell>
    <Table.DataCell>Riker</Table.DataCell>
    <Table.DataCell>Kommandør</Table.DataCell>
  </Table.Row>
  <Table.Row>
    <Table.HeaderCell>3</Table.HeaderCell>
    <Table.DataCell>Geordi</Table.DataCell>
    <Table.DataCell>La Forge</Table.DataCell>
    <Table.DataCell>Sjefsingeniør</Table.DataCell>
  </Table.Row>
</Table.Body>
</Table>`;

export const TableSmall: ExampleComponent = () => {
  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Fornavn</Table.HeaderCell>
          <Table.HeaderCell>Etternavn</Table.HeaderCell>
          <Table.HeaderCell>Rolle</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell>1</Table.HeaderCell>
          <Table.DataCell>Jean-Luc</Table.DataCell>
          <Table.DataCell>Picard</Table.DataCell>
          <Table.DataCell>Kaptein</Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>2</Table.HeaderCell>
          <Table.DataCell>William</Table.DataCell>
          <Table.DataCell>Riker</Table.DataCell>
          <Table.DataCell>Kommandør</Table.DataCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>3</Table.HeaderCell>
          <Table.DataCell>Geordi</Table.DataCell>
          <Table.DataCell>La Forge</Table.DataCell>
          <Table.DataCell>Sjefsingeniør</Table.DataCell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

TableSmall.bg = BgColors.WHITE;
TableSmall.react = `<Table size="small">
<Table.Header>
  <Table.Row>
    <Table.HeaderCell>ID</Table.HeaderCell>
    <Table.HeaderCell>Fornavn</Table.HeaderCell>
    <Table.HeaderCell>Etternavn</Table.HeaderCell>
    <Table.HeaderCell>Rolle</Table.HeaderCell>
  </Table.Row>
</Table.Header>
<Table.Body>
  <Table.Row>
    <Table.HeaderCell>1</Table.HeaderCell>
    <Table.DataCell>Jean-Luc</Table.DataCell>
    <Table.DataCell>Picard</Table.DataCell>
    <Table.DataCell>Kaptein</Table.DataCell>
  </Table.Row>
  <Table.Row>
    <Table.HeaderCell>2</Table.HeaderCell>
    <Table.DataCell>William</Table.DataCell>
    <Table.DataCell>Riker</Table.DataCell>
    <Table.DataCell>Kommandør</Table.DataCell>
  </Table.Row>
  <Table.Row>
    <Table.HeaderCell>3</Table.HeaderCell>
    <Table.DataCell>Geordi</Table.DataCell>
    <Table.DataCell>La Forge</Table.DataCell>
    <Table.DataCell>Sjefsingeniør</Table.DataCell>
  </Table.Row>
</Table.Body>
</Table>`;
