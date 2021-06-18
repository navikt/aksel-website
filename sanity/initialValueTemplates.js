import T from "@sanity/base/initial-value-template-builder";

export default [
  ...T.defaults(),

  T.template({
    id: "ds_component_page_template",
    title: "Komponentside template",
    schemaType: "ds_component_page",
    value: {
      tab_3: [{ _type: "prop_table", props: [{ _type: "prop_table.prop" }] }],
    },
  }),
];
