export default {
  title: "Designsystem side",
  name: "ds_page",
  type: "document",
  //__experimental_actions: [, /* "create" */ "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "Dokumenttittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Sidetittel",
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
      title: "Slug",
      name: "slug",
      type: "slug",
    },
    {
      name: "tab_1",
      type: "array",
      title: "Tab 1",
      initialValue: [
        {
          _type: "code_example",
          _type: "code_example",
        },
      ],
      of: [
        { type: "free_block" },
        { type: "code_example" },
        { type: "prop_table" },
        { type: "changelog" },
      ],
    },
    {
      name: "tab_2",
      type: "array",
      title: "Tab 2",
      initialValue: [
        {
          _type: "prop_table",
          _type: "changelog",
        },
      ],
      of: [
        { type: "free_block" },
        { type: "code_example" },
        { type: "prop_table" },
        { type: "changelog" },
      ],
    },
  ],
};
