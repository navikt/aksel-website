export const documentFeedbackMetadata = {
  title: "Tilbakemeldinger",
  name: "metadata_feedback",
  type: "object",
  initialValue: {
    high_priority: false,
  },
  fields: [
    {
      title: "Skjul artikkel feedback modul",
      description: "Gjemmer <<Var denne artikkelen til hjelp?>> modulen.",
      name: "hide_feedback",
      type: "boolean",
      initialValue: false,
    },
  ],
};