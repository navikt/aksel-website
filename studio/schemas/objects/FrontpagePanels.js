/* export const panelArray = {
  title: "Panel Array",
  name: "frontpagepanelarray",
  type: "array",
  of: [{ title: "panels", type: "frontpagepanel" }],
}; */

export default {
  title: "FrontpagePanels",
  name: "frontpagepanels",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Content",
      name: "content",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "URL",
      name: "url",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Icon name",
      name: "iconname",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
