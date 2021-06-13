export default {
  title: "Frontpage",
  name: "frontpage",
  type: "document",
  __experimental_actions: ["create", "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "Dokumentnavn",
      name: "title",
      type: "string",
    },
    {
      title: "Sidetittel",
      name: "headline",
      type: "string",
    },
    {
      title: "Lenkepaneler",
      name: "panels",
      type: "array",
      of: [{ title: "panels", type: "reflinkpanel" }],
    },
  ],
  /* preview: {
    prepare: () => ({
      title: "Forside",
    }),
  }, */
};
