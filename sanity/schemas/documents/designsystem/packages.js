export default {
  name: "ds_package",
  title: "Kodepakke",
  type: "document",
  fields: [
    {
      title: "Navn",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
