export default {
  title: "Frontpage",
  name: "frontpage",
  type: "document",
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
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
