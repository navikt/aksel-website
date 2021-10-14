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
      of: [{ type: "prop_table_prop" }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    prepare: () => ({ title: "Proptable" }),
  },
};

export const prop = {
  name: "prop_table_prop",
  title: "Prop",
  type: "object",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Type",
      name: "type",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Beskrivelse (optional)",
      name: "description",
      type: "string",
    },
    {
      title: "Default (optional)",
      name: "default",
      type: "string",
    },
    {
      title: "Required",
      name: "required",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    },
  ],
  initialValue: () => ({
    required: false,
  }),
  preview: {
    select: {
      name: "name",
    },
    prepare: ({ name }) => ({ title: name }),
  },
};
