export default {
  title: "Kode eksempel",
  name: "code_example_ref",
  type: "object",
  fields: [
    {
      title: "Kode eksempel",
      name: "ref",
      type: "reference",
      to: [{ type: "ds_code_example" }],
    },
  ],
  preview: {
    select: {
      example: "ref.title",
    },
    prepare: ({ example }) => ({ title: example }),
  },
};
