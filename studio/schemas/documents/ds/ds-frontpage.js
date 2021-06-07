export default {
  title: "Designsystem frontpage",
  name: "designsystemfrontpage",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Headline",
      name: "headline",
      type: "string",
    },
    {
      title: "Link panels",
      name: "panels",
      type: "array",
      of: [{ title: "panels", type: "frontpagepanels" }],
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      initialValue: `ds`,
      /* hidden: false, */
      readOnly: false,
    },
  ],
};
