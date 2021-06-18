export default {
  title: "Komponentside",
  name: "ds_component_page",
  type: "document",
  //__experimental_actions: [, /* "create" */ "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "Dokument tittel (for søk internt i sanity)",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Tittel",
      name: "heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Ingress",
      name: "ingress",
      type: "string",
    },
    {
      title: "Versjon",
      name: "version",
      type: "reference",
      description: "Viser hvilken versjon denne komponenten er",
      to: [{ type: "component_versions" }],
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
    },
    {
      name: "tab_1",
      type: "array",
      title: "Bruk",
      of: [{ type: "free_block" }],
    },
    {
      name: "tab_2",
      type: "array",
      title: "Design",
      of: [],
    },
    {
      name: "tab_3",
      type: "array",
      title: "Kode",
      of: [
        { type: "free_block" },
        { type: "code_example" },
        { type: "prop_table" },
        { type: "changelog" },
      ],
    },
    {
      name: "tab_4",
      type: "array",
      title: "Tilgjengelighet",
      of: [
        { type: "free_block" },
        { type: "code_example" },
        { type: "prop_table" },
        { type: "changelog" },
      ],
    },
  ],
};
