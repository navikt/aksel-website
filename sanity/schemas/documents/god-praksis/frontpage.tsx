export default {
  title: "Forside",
  name: "gp_frontpage",
  type: "document",
  fields: [
    {
      name: "content",
      type: "string",
      title: "Innhold",
      validation: (Rule) => Rule.required(),
    },
  ],
};
