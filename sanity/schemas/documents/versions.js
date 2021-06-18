export default {
  title: "Versjoner",
  name: "component_versions",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Versjon",
      name: "version",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
