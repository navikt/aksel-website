export const PropTable = {
  title: "Prop table",
  name: "prop_table",
  type: "object",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "rows",
      title: "Props",
      type: "array",
      of: [
        {
          type: "prop_table.row",
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};

export const TableRow = {
  title: "Table Row",
  name: "prop_table.row",
  type: "object",
  fields: [
    {
      title: "Navn",
      name: "name",
      type: "string",
    },
    {
      title: "Verdi",
      name: "value",
      type: "string",
    },
    {
      title: "Required",
      name: "required",
      type: "boolean",
    },
    {
      title: "Default",
      name: "default",
      type: "string",
    },
  ],
};
