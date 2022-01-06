export default {
  title: "Sandbox for komponent",
  name: "code_sandbox_ref",
  type: "object",
  fields: [
    {
      title: "Sandbox",
      name: "ref",
      type: "reference",
      to: [{ type: "ds_code_sandbox" }],
    },
  ],
  preview: {
    select: {
      example: "ref.title",
    },
    prepare: ({ example }) => ({ title: example }),
  },
};
