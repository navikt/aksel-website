export default {
  title: "Redaktører",
  name: "contact_person",
  type: "document",
  fields: [
    {
      title: "Navn",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Team",
      name: "team",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
