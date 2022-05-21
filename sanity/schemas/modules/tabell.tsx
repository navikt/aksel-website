import { toPlainText } from "@/lib";
import tableSchema from "part:power-table/schema";

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