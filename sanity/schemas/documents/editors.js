export default {
  title: "Redaktører",
  name: "editor",
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
