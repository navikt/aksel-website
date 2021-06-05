export default {
  title: "DesignsystemPage",
  name: "designsystempage",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Ingress",
      name: "ingress",
      type: "string",
      /* validation: (Rule) => Rule.required(), */
    },
    {
      title: "Slug/URL",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Content",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],
};
