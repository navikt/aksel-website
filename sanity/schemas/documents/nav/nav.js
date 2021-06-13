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
      type: "array",
      name: "sections",
      title: "Undersider",
      description: "Navigasjonsstrukturen til sidemenyen",
      of: [{ type: "navigation.section" }],
    },
  ],
};
