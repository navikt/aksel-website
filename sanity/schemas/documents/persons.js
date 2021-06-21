export default {
  title: "Personer",
  name: "contact_person",
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
