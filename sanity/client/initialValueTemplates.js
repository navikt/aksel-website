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
        placeholder("Kode eksempel"),
        ...getHeading("Komponent eksempel 2"),
        placeholder("Kode eksempel"),
        placeholder("Do / Dont"),
        ...getHeading("Universell utforming"),
        placeholder("Komponent interaksjoner (UU)"),
        ...getHeading("Designavgjørelse"),
        ...getHeading("Bruk i det fri"),
      ],
      design: [
        placeholder("Side links til designsider"),
        ...getHeading("Anatomien"),
        ...getHeading("Bruke komponenten i Figma"),
        placeholder("Do / Dont for figma"),
      ],
      development: [
        placeholder("Side links for utivklere"),
        placeholder("Kode eksempler"),
        placeholder("Prop table"),
      ],
      accessibility: [
        ...getHeading("Vurdering av universell utforming"),
        ...getHeading("Referanser"),
        ...getHeading("Teste universell utforming"),
      ],
    }),
  }),
];

const placeholder = (text) => ({
  _type: "block",
  children: [
    {
      _type: "span",
      marks: [],
      text: `!!** Sett inn ${text} her **!!`,
    },
  ],
  markDefs: [],
  style: "normal",
});

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
