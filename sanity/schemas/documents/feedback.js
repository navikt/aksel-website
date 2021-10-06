import { allDocumentTypes } from "../../config";

export default {
  title: "Feedback",
  name: "feedback",
  type: "document",
  fields: [
    {
      title: "Side",
      name: "page",
      type: "reference",
      weak: true,
      to: [...allDocumentTypes.map((x) => ({ type: x }))],
      options: {},
      readOnly: true,
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Positiv/Negativ",
      name: "feebacktype",
      type: "string",
      options: {
        list: [
          { value: "positive", title: "Positiv" },
          { value: "negative", title: "Negativ" },
        ],
        layout: "radio",
      },
      readOnly: true,
    },
    {
      title: "Kommentar",
      name: "comment",
      type: "text",
      hidden: ({ document }) => document?.feebacktype === "positive",
      readOnly: true,
    },
    {
      name: "done",
      type: "boolean",
      title: "Er tilbakemeldingen tatt rede for?",
      initialValue: false,
    },
    {
      name: "notes",
      type: "text",
      title: "Interne notater",
      description: "Hva gjorde vi med denne tilbakemeldingen",
    },
  ],
};
