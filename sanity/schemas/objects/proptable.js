export default {
  name: "prop_table",
  title: "Proptable",
  type: "object",
  fields: [
    {
      type: "array",
      name: "props",
      title: "Props",
      description: "Liste med props, tilsvarer en rad i tabellen",
      of: [{ type: "prop_table.prop" }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    prepare: () => ({ title: "Proptable" }),
  },
};

export const prop = {
  name: "prop_table.prop",
  title: "Prop",
  type: "object",
  fields: [
    {
      title: "Name",
      name: "prop_name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Type",
      name: "prop_type",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Beskrivelse (optional)",
      name: "prop_description",
      type: "string",
    },
    {
      title: "Default (optional)",
      name: "prop_default",
      type: "string",
    },
    {
      title: "Required",
      name: "prop_required",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    },
  ],
  initialValue: () => ({
    prop_required: false,
  }),
  preview: {
    select: {
      name: "prop_name",
    },
    prepare: ({ name }) => ({ title: name }),
  },
};
