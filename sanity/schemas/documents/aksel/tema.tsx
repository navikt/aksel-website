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
        Rule.required()
          .max(14)
          .error("Temaet må ha en kort Tag på max 14 tegn"),
    },
    {
      title: "Kort Intro/Oppsummering",
      description: "Brukes i kort og innganger",
      name: "oppsummering",
      type: "string",
      group: "innhold",
      validation: (Rule) =>
        Rule.required()
          .max(65)
          .error("Temaet burde ha en kort oppsummering/intro på max 65tegn"),
    },
    {
      title: "Beskrivelse",
      name: "beskrivelse",
      type: "riktekst",
      group: "innhold",
    },
  ],
};
