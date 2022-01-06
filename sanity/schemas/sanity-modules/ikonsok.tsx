export default {
  title: "Ikonsok",
  name: "icon_search",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      readOnly: true,
      initialValue: "Ikonsøk",
    },
  ],
  preview: {
    prepare: () => ({ title: "Ikonsøk" }),
  },
};
