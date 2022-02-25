export default {
  title: "Forside",
  name: "ds_frontpage",
  type: "document",
  fields: [
    {
      name: "body",
      type: "riktekst_enkel",
      title: "Innhold",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cards",
      type: "array",
      title: "Cards",
      of: [
        {
          title: "Card",
          name: "card",
          type: "object",
          fields: [
            {
              title: "Lenke",
              name: "link_ref",
              type: "reference",
              to: [
                { type: "ds_component_page" },
                { type: "komponent_artikkel" },
                { type: "ds_artikkel" },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              title: "Tittel",
              name: "title",
              type: "string",
            },
            {
              title: "Innhold",
              name: "content",
              type: "string",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare: () => ({ title: "Forside designsystemet" }),
  },
};
