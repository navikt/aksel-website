import React from "react";
import { Table } from "@navikt/ds-react";

function toPlainText(blocks = []) {
  return blocks
    .filter((block) => !(block._type !== "block" || !block.children))
    .map((block) => {
      return block.children.map((child) => child.text).join("");
    })
    .join("\n");
}

export default {
  title: "Tabell",
  name: "table",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Tabell tittel (Brukes bare internt i sanity)",
    },
    {
      title: "Tabell headers",
      description:
        "Definerer hva som regnes som tabell-headers for semantisk visning",
      name: "header_direction",
      type: "string",
      initialValue: "row",
      options: {
        list: [
          { value: "row", title: "Første rad" },
          { value: "column", title: "Føreste kolonne" },
        ],
        layout: "radio",
      },
    },
    {
      name: "rows",
      title: "Rader",
      type: "array",
      of: [
        {
          type: "row",
        },
      ],
    },
  ],
  preview: {
    select: {
      rows: "rows",
    },
    prepare(selection) {
      return { ...selection };
    },
    component: (selection) => {
      return (
        <Table>
          <Table.Body>
            {selection.value.rows &&
              selection.value.rows.map((row) => (
                <Table.Row key={row._key}>
                  {row.cells &&
                    row.cells.map((cell) => (
                      <Table.DataCell key={cell._key}>
                        {toPlainText(cell?.body ?? [])}
                      </Table.DataCell>
                    ))}
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      );
    },
  },
};

export const Rows = {
  title: "Rad",
  name: "row",
  type: "object",
  fields: [
    {
      name: "cells",
      type: "array",
      of: [{ type: "cell" }],
    },
  ],
  preview: {
    select: {
      cells: "cells",
    },
    prepare({ cells }) {
      return {
        title: toPlainText(cells?.[0]?.body ?? []),
        subtitle: `Kolonner: ${cells.length}`,
      };
    },
  },
};

export const Cells = {
  title: "Celle",
  name: "cell",
  type: "object",
  fields: [
    {
      name: "body",
      title: "Innhold",
      type: "blockContent_simple",
    },
    {
      title: "Plassering av innhold",
      description: "Ved ingen valgt er venstre standard",
      name: "alignment",
      type: "string",
      initialValue: "left",
      options: {
        list: [
          { value: "left", title: "Venstre" },
          { value: "center", title: "Senter" },
          { value: "right", title: "Høyre" },
        ],
        layout: "radio",
      },
    },
  ],
  preview: {
    select: {
      title: "body",
    },
  },
};
