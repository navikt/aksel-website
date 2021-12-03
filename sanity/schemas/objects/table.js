import RowsInput from "part:@ssfbank/sanity-plugin-byo-table/rows-input";

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
      inputComponent: RowsInput,
    },
  ],
  preview: {
    select: {
      title: "title",
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
