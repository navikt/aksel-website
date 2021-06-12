import { getExamples } from "examples";

export default {
  name: "code_example",
  title: "Kode eksempler",
  type: "object",
  fields: [
    {
      title: "Kode eksempel",
      name: "code_preview",
      type: "string",
      options: {
        list: [...getExamples()],
      },
    },
    {
      name: "codeExample",
      title: "Kode eksempel",
      type: "code",
      //TODO: Legge til support bare for spesifikke språk (`languageAlternatives` er broken atm)
    },
  ],
};
