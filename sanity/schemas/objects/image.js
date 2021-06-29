export default {
  name: "picture",
  title: "Bilde",
  type: "object",
  fields: [
    {
      title: "Tittel (Vises bare internt i sanity)",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Bilde",
      name: "picture_image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Caption",
      name: "picture_caption",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
