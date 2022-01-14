export const documentSearchMetadata = {
  title: "Søk",
  name: "metadata_search",
  type: "object",
  group: "settings",
  initialValue: {
    high_priority: false,
  },
  fields: [
    {
      title: "Høyere prioritet i søk",
      description: "Bruk bare hvis siden virkeling trenger det!",
      name: "high_priority",
      type: "boolean",
      initialValue: false,
    },
    {
      title: "Søkbare tags",
      description: "Tags som skiller seg ut fra selve innholdet eller heading",
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
  ],
};
