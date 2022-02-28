export default {
  title: "Team",
  name: "team",
  type: "document",
  fields: [
    {
      title: "Navn",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().error("Må legge til navn"),
    },
  ],
};
