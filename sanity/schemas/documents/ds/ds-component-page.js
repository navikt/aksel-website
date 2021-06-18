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
      title: "Npm link",
      name: "npm_link",
      type: "url",
    },
    {
      title: "Github link",
      name: "github_link",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Figma link",
      name: "figma_link",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Versjon",
      name: "version",
      type: "reference",
      description: "Viser hvilken versjon denne komponenten er",
      to: [{ type: "component_versions" }],
    },
    {
      name: "tab_1",
      type: "array",
      title: "Bruk",
      of: [{ type: "portable_block" }, { type: "code_example" }, { type: "do_dont" }],
      validation: (Rule) => Rule.required().min(4),
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
        { type: "portable_block" },
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
        { type: "portable_block" },
        { type: "code_example" },
        { type: "prop_table" },
        { type: "changelog" },
      ],
    },
  ],
};
