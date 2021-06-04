export default {
  title: "Designsystem",
  name: "designsystem",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Slug/URL",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      title: "Genre",
      name: "genre",
      type: "string",
      options: {
        list: [
          { title: "Sci-Fi", value: "sci-fi" },
          { title: "Western", value: "western" },
        ], // <-- predefined values
        layout: "radio", // <-- defaults to 'dropdown'
      },
    },
  ],
};
