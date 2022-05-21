export default {
  name: "prop_table",
  title: "Proptable",
  type: "object",
  fields: [
    {
      title: "Props",
      type: "array",
      name: "komponenter",
      of: [
        {
          title: "Komponent",
          type: "object",
          name: "komponent",
          fields: [
            {
              title: "Komponent navn",
              description: "Slik man ville brukt den, eks Accordion.Item",
              type: "string",
              name: "title",
            },
            {
              title: "Bruker komponenten OverridableComponent API-et",
              type: "boolean",
              name: "overridable",
              initialValue: false,
            },
            {
              name: "propref",
              title: "Komponent referanse",
              type: "reference",
              to: [{ type: "ds_props" }],
            },
          ],
        },
      ],
    },
  ],
};
