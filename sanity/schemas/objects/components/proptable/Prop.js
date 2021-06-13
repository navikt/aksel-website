export default {
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
      title: "Beskrivelse",
      name: "prop_description",
      type: "string",
    },
    {
      title: "Default",
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
