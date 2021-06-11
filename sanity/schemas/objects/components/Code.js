export default {
  name: "code_example",
  title: "Kode eksempler",
  type: "object",
  fields: [
    {
      title: "Storybook eksempel (url)",
      name: "storybook_frame",
      type: "url",
    },
    {
      name: "codeExample",
      title: "Kode eksempel",
      type: "code",
      //TODO: Legge til support bare for spesifikke språk (`languageAlternatives` er broken atm)
    },
  ],
};
