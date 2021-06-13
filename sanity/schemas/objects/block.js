export default {
  title: "Innholds blokk",
  name: "free_block",
  type: "object",
  fields: [
    {
      name: "body",
      title: "Innhold",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],
};
