// nav.js
export default {
  name: "navigation",
  type: "document",
  title: "Navigation",
  fields: [
    {
      type: "string",
      name: "name",
      title: "Name",
    },
    {
      type: "string",
      name: "title",
      title: "Title",
    },
    {
      type: "array",
      name: "sections",
      title: "Sections",
      of: [{ type: "navigation.section" }],
    },
  ],
};
