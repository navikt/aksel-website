export default {
  title: "Innholds blokk",
  name: "free_block",
  type: "object",

  fields: [
    {
      name: "title",
      title: "Beskrivelse av innhold",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Innhold",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({ title: "Fritekst: " + title }),
  },
};
