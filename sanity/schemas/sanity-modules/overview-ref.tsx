export default {
  title: "Komponentoversikt",
  name: "component_overview",
  type: "object",
  fields: [
    {
      title: "Ref til kodeoversikt",
      description:
        "Legger til en tabell med komponentoversikt. Skal bare brukes for siden Komponenter oversikt",
      name: "ref",
      type: "reference",
      to: [{ type: "ds_component_overview" }],
    },
  ],
  preview: {
    prepare: () => ({ title: "Komponentoversikt" }),
  },
};
