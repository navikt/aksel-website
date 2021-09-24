export default {
  name: "ds_changelog",
  title: "Changelog",
  type: "document",
  fields: [
    {
      title: "Tittel for endring",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Dato",
      description: "Endringer sortes basert på datoen gitt her",
      name: "change_date",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Pull request (optional)",
      name: "pull_request",
      type: "url",
    },
    {
      title: "Truffede komponenter",
      description: "Linker endringen til alle/spesifike komponenter",
      name: "dependents",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { value: "all", title: "Alle" },
          { value: "spesific", title: "Spesifik komponent" },
        ],
        layout: "radio",
      },
    },
    {
      title: "Spesifike komponenter",
      name: "spesific_component",
      type: "array",
      of: [
        { type: "reference", to: [{ type: "ds_component_page" }], weak: true },
      ],

      hidden: ({ document }) => !(document?.dependents === "spesific"),
    },
    {
      name: "body",
      title: "Tekst",
      description: "Beskrivelse av hva endringen gjorde",
      type: "blockContent_simple",
      validation: (Rule) => Rule.required(),
    },
  ],
};
