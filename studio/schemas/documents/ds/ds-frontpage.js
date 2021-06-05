export default {
  title: "Designsystem frontpage",
  name: "designsystemfrontpage",
  type: "document",
  fields: [
    {
      title: "Headline",
      name: "title",
      type: "string",
    },
    {
      title: "Link panels",
      name: "panels",
      type: "array",
      of: [{ title: "panels", type: "frontpagepanels" }],
    },
  ],
};
