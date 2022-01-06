export default {
  title: "Fargekategori",
  name: "color_category_ref",
  type: "object",
  fields: [
    {
      title: "Fargekategori",
      name: "ref",
      type: "reference",
      to: [{ type: "ds_color_categories" }],
    },
  ],
  preview: {
    select: {
      example: "ref.title",
    },
    prepare: ({ example }) => ({ title: example }),
  },
};
