export default {
  name: "prop_table",
  title: "Proptable",
  type: "object",
  fields: [
    {
      type: "array",
      name: "props",
      title: "Props",
      of: [{ type: "prop_table.prop" }],
    },
  ],
  preview: {
    prepare: () => ({ title: "Proptable" }),
  },
};
