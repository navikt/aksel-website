import tableSchema from "part:power-table/schema";
import React from "react";

function toPlainText(blocks = []) {
  return blocks
    .filter((block) => !(block._type !== "block" || !block.children))
    .map((block) => {
      return block.children.map((child) => child.text).join("");
    })
    .join("\n");
}

const Tabell = {
  type: "object",
  name: "tabell",
  title: "Tabell",
  fields: [
    {
      title: "Tittel (optional)",
      description: "Gi tabellen et navn for å lettere finne den",
      type: "string",
      name: "title",
    },
    {
      title: "Tabell",
      type: "powerTable",
      name: "powerTable",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(s) {
      return {
        title: s?.title ? s?.title : "Tabell",
        subtitle: s?.title ? "Tabell" : "",
      };
    },
  },
};

export const TabellSchema = tableSchema({
  title: "Tabell",
  name: "powerTable",
  cellSchema: {
    type: "object",
    fields: [{ type: "riktekst_tabell", name: "body" }],
    preview: {
      select: {
        body: "body",
      },
      prepare(s) {
        return {
          title: toPlainText(s?.body) ?? "-",
        };
      },
    },
  },
});

export default Tabell;
