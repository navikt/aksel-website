export default {
  title: "Frontpage",
  name: "frontpage",
  type: "document",
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "title",
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
  ],
  preview: {
    prepare: () => ({
      title: "Forside",
    }),
  },
};
