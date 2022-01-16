export default {
  title: "Changelogs",
  name: "changelogs_ref",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      readOnly: true,
      initialValue: "Changelogs",
    },
  ],
  preview: {
    prepare: () => ({ title: "Changelog side" }),
  },
};
