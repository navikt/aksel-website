export const documentSearchMetadata = {
  title: "Forbedre søk",
  name: "metadata_search",
  type: "object",
  initialValue: {
    high_priority: false,
  },
  fields: [
    {
      title: "Høyere prioritet i søk",
      name: "high_priority",
      type: "boolean",
      initialValue: false,
    },
    {
      title: "Søkbare tags",
      title: "Søkbare tags",
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
  ],
};
