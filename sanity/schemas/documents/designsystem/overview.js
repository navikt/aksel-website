export default {
  title: "Komponentoversikt",
  name: "ds_component_overview",
  type: "document",
  fields: [
    {
      title: "Komponent",
      name: "components",
      type: "array",
      of: [
        {
          title: "Komponent",
          name: "component",
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
                "Kobler komponenten til en pakke og da om den er core/intern/navno. Alle tilgjengelige valg ligge under <Kodepakker>",
              name: "linked_package",
              type: "reference",
              to: [{ type: "ds_package" }],
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
              type: "string",
              hidden: ({ parent }) => !parent?.in_design,
              validation: (Rule) => Rule.required(),
              initialValue: "old",
              options: {
                layout: "radio",
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
              name: "in_code_beta",
              title: "Er komponenten fortsatt i Beta?",
              type: "boolean",
              validation: (Rule) => Rule.required(),
              hidden: ({ parent }) => !parent?.in_code,
              options: {
                layout: "checkbox",
              },
              initialValue: true,
            },
            {
              title: "Er komponentkoden i synk med Figma?",
              name: "figma_sync",
              type: "boolean",
              hidden: ({ parent }) => !parent?.in_code,
              validation: (Rule) => Rule.required(),
              initialValue: true,
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
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    prepare: () => ({ title: "Komponentoversikt" }),
  },
};