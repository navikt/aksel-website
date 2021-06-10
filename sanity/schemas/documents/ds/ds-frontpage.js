export default {
  title: "Designsystem forside",
  name: "ds_frontpage",
  type: "document",
  __experimental_actions: ["create", "update", "delete", "publish"],
  fields: [
    {
      title: "Dokumentitttel",
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
    {
      title: "Slug (readonly)",
      name: "slug",
      type: "slug",
      readOnly: true,
    },
  ],
  initialValue: () => ({
    slug: { current: "ds" },
  }),
};
