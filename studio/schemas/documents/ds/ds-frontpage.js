export default {
  title: "Designsystem frontpage",
  name: "designsystem-frontpage",
  type: "document",
  __experimental_actions: ["create", "update", "delete", "publish"],
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
      hidden: true,
      readOnly: true,
    },
  ],
  initialValue: () => ({
    slug: { current: "ds" },
  }),
};
