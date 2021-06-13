// navigationLink.js
export default {
  name: "navigation.link",
  type: "object",
  title: "Link",
  fields: [
    {
      type: "reference",
      name: "target",
      title: "Target page",
      to: [{ type: "ds_page" }],
      description: "No target article turns the item into a subheading.",
      // _weak: true // enable if you don't want reference integrity checks
    },
    {
      type: "string",
      name: "title",
      title: "Title",
      description: "Override title from the target article.",
    },
    /* {
      type: "array",
      name: "children",
      title: "Children",
      of: [{ type: "navigation.link" }],
    }, */
  ],
};
