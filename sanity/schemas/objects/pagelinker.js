export default {
  title: "Side linker",
  name: "page_linker",
  type: "object",

  fields: [
    {
      name: "previous",
      title: "Forrige side",
      type: "reference",
      to: [{ type: "ds_component_page" }],
    },
    {
      name: "next",
      title: "Neste side",
      type: "reference",
      to: [{ type: "ds_component_page" }],
    },
  ],
};
