export default {
  title: "Komponentoversikt",
  name: "component_overview",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      readOnly: true,
    },
  ],
  preview: {
    prepare: () => ({ title: "Komponentoversikt" }),
  },
};
