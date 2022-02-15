import tableSchema from "part:power-table/schema";

const Tabell = tableSchema({
  title: "Tabell",
  name: "powerTable",
  cellSchema: {
    type: "object",
    fields: [{ type: "riktekst_enkel", name: "body" }],
  },
});

export default Tabell;
