// nav.js
// https://www.sanity.io/schemas/nested-navigation-structure-757f39ee
export default {
  name: "navigation",
  type: "document",
  title: "Navigation",
  fields: [
    {
      type: "string",
      name: "name",
      title: "Navn",
    },
    {
      type: "string",
      name: "title",
      title: "Tittel",
    },
    {
      type: "array",
      name: "sections",
      title: "Undersider",
      of: [{ type: "navigation.section" }],
    },
  ],
};
