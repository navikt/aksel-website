export default {
  title: "Tokens",
  name: "tokens",
  type: "object",
  fields: [
    {
      title: "Tittel/beskrivelse",
      name: "title",
      type: "string",
    },
    {
      title: "Tokens",
      name: "Tokens",
      type: "array",
      of: [{ type: "reference", to: [{ type: "ds_tokens" }] }],
    },
  ],
  /* preview: {
    select: {
      code: "code",
      ref: "ref.title",
    },
    prepare: ({ code, ref }) => ({
      title: code ? `${code?.code?.slice(0, 50)}...` : ref ? ref : "Kode",
      subtitle: code ? "Kode" : ref ? "Predefinert kodesnippet" : "",
    }),
  }, */
};
