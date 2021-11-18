export default {
  title: "Komponentoversikt",
  name: "components_overview",
  type: "object",
  fields: [
    {
      title: "Komponent",
      name: "components",
      type: "array",
      of: [{ type: "overview_component", title: "Komponent" }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    prepare: () => ({ title: "Komponentoversikt" }),
  },
};

export const OverviewComponent = {
  title: "Komponent",
  name: "overview_component",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Komponentnavn",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Pakkenavn",
      description:
        "Kobler komponenten til en pakke og da om den er core/intern/navno",
      name: "linked_package",
      type: "reference",
      to: [{ type: "ds_package" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "new",
      title: "Er komponenten ny?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      options: {
        layout: "checkbox",
      },
      initialValue: false,
    },
    {
      name: "in_design",
      title: "Er komponenten i Figma/designet?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      options: {
        layout: "checkbox",
      },
      initialValue: false,
    },
    {
      title: "Figma bibliotek",
      name: "figma_version",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ parent }) => !parent?.in_design,
      validation: (Rule) => Rule.required(),
      initialValue: "old",
      options: {
        list: [
          { value: "new", title: "3.0 (ny)" },
          { value: "old", title: "2.5 (gammel)" },
          { value: "beta", title: "Beta" },
        ],
      },
    },
    {
      name: "in_code",
      title: "Er komponenten Kodet?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      options: {
        layout: "checkbox",
      },
      initialValue: false,
    },
    {
      title: "Er komponentkoden i synk med Figma?",
      name: "figma_sync",
      type: "boolean",
      hidden: ({ parent }) => !parent?.in_code,
      validation: (Rule) => Rule.required(),
      initialValue: "true",
    },
    {
      name: "in_doc",
      title: "Er komponenten i dokumentert?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      options: {
        layout: "checkbox",
      },
      initialValue: false,
    },
    {
      title: "Dokumentasjons-status",
      name: "doc_status",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ parent }) => !parent?.in_doc,
      validation: (Rule) => Rule.required(),
      initialValue: "yes",
      options: {
        list: [
          { value: "yes", title: "Ja" },
          { value: "beta", title: "I Beta" },
        ],
      },
    },
  ],
};
