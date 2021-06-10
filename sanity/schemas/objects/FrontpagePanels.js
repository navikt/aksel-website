export default {
  title: "FrontpagePanels",
  name: "frontpagepanels",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Content",
      name: "content",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pagereference",
      type: "reference",
      to: [{ type: "designsystempage" }, { type: "designsystem-frontpage" }],
    },
  ],
};
