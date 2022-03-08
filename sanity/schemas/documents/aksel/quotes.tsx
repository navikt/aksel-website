export default {
  title: "Quotes",
  name: "quotes",
  type: "document",
  fields: [
    {
      title: "Quotes",
      name: "quotes",
      type: "array",
      of: [
        {
          title: "Quotes",
          name: "list",
          type: "object",
          fields: [
            {
              title: "Quote",
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required().error("Må ha en quote"),
            },
            {
              title: "Kilde",
              name: "kilde",
              type: "string",
              validation: (Rule) => Rule.required().error("Må ha en kilde"),
            },
          ],
        },
      ],
    },
  ],
};
