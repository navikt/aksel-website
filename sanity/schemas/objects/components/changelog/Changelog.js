export default {
  name: "changelog",
  title: "Changelog",
  type: "object",
  fields: [
    {
      type: "array",
      name: "changes",
      title: "Endringer",
      of: [{ type: "changelog.change" }],
    },
  ],
  preview: {
    prepare: () => ({ title: "Changelog" }),
  },
};
