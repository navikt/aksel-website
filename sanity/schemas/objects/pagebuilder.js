export default {
  name: "page_builder",
  title: "Sidebygger",
  type: "object",
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
    },
    {
      name: "page_sections",
      type: "array",
      title: "Tabber",
      of: [
        { type: "free_block" },
        { type: "code_example" },
        { type: "prop_table" },
        { type: "changelog" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({ title: title }),
  },
};
