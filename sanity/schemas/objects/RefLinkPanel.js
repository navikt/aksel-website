export default {
  title: "RefLinkPanel",
  name: "reflinkpanel",
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
      to: [{ type: "ds_page" }, { type: "ds_frontpage" }],
    },
  ],
};
