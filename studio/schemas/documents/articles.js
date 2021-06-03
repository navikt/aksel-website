export default {
  title: "Article",
  name: "article",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      title: "Categories",
      name: "category",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            { type: "category" },
            // etc
          ],
        },
      ],
    },
  ],
};
