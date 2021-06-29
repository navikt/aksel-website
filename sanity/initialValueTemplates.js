import T from "@sanity/base/initial-value-template-builder";

export default [
  ...T.defaults(),

  T.template({
    id: "ds_component_page_template",
    title: "Komponentside template",
    schemaType: "ds_component_page",
    value: () => ({
      status: "wip",
      usage: [
        ...getHeading("Slik brukes komponeten"),
        ...getHeading("Anatomien"),
        ...getHeading("Komponent eksempel 1"),
        { _type: "code_example" },
        ...getHeading("Komponent eksempel 2"),
        { _type: "code_example" },
        { _type: "do_dont" },
        ...getHeading("Universell utforming"),
        { _type: "uu_interaction" },
        { _type: "linker" },
        ...getHeading("Designavgjørelse"),
        ...getHeading("Bruk i det fri"),
      ],
      design: [
        { _type: "linker" },
        ...getHeading("Anatomien"),
        ...getHeading("Bruke komponenten i Figma"),
        { _type: "do_dont" },
      ],
      development: [
        { _type: "linker" },
        { _type: "code_example" },
        { _type: "prop_table" },
        { _type: "changelog" },
        { _type: "linker" },
      ],
      accessibility: [
        ...getHeading("Vurderin av universell utforming"),
        ...getHeading("Referanser"),
        ...getHeading("Teste universell utforming"),
      ],
    }),
  }),
];

const getHeading = (heading) => [
  {
    _type: "block",
    children: [
      {
        _type: "span",
        marks: [],
        text: heading,
      },
    ],
    markDefs: [],
    style: "h2",
  },
  {
    _type: "block",
    children: [
      {
        _type: "span",
        marks: [],
        text: "Et laborum deserunt consectetur enim cupidatat sit laborum ullamco.",
      },
    ],
    markDefs: [],
    style: "normal",
  },
];
