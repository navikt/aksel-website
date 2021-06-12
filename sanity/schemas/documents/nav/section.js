// navigationSection.js
export default {
  name: "navigation.section",
  type: "object",
  title: "Section",
  fields: [
    {
      type: "reference",
      name: "target",
      title: "Target article",
      to: [{ type: "ds_page" }],
      // _weak: true // enable if you don't want reference integrity checks
    },
    {
      type: "string",
      name: "title",
      title: "Title",
    },
    {
      type: "array",
      name: "links",
      title: "Links",
      of: [{ type: "navigation.link" }],
    },
  ],
};
