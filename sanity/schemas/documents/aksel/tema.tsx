import { groups } from "../templates";

export default {
  title: "Aksel Tema",
  name: "aksel_tema",
  type: "document",
  groups: [...groups],
  fields: [
    {
      title: "Navn",
      name: "title",
      type: "string",
      group: "innhold",
      validation: (Rule) => Rule.required().error("Temaet må ha et navn"),
    },
    {
      title: "Tag",
      name: "tag",
      type: "string",
      group: "innhold",
      validation: (Rule) =>
        Rule.required().max(12).error("Temaet må ha en kort Tag"),
    },
    {
      title: "Kort Intro/Oppsummering",
      description: "Brukes i kort og innganger",
      name: "oppsummering",
      type: "string",
      group: "innhold",
      validation: (Rule) =>
        Rule.required()
          .max(50)
          .error("Temaet burde ha en kort oppsummering/intro"),
    },
    {
      title: "Beskrivelse",
      name: "beskrivelse",
      type: "riktekst",
      group: "innhold",
    },
  ],
};
