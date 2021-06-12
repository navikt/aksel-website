export default {
  title: "Designsystem side",
  name: "ds_page",
  type: "document",
  fields: [
    {
      title: "Dokumenttittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Sidetittel",
      name: "heading",
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
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: (node) => {
          console.log(node);
          return "demo";
        },
      },
    },
    {
      name: "body",
      title: "Innhold",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],
};
