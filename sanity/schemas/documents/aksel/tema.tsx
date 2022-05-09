import { groups } from "@/lib";

export default {
  title: "Aksel Tema",
  name: "aksel_tema",
  type: "document",
  groups,
  fields: [
    {
      title: "Navn",
      name: "title",
      type: "string",
      group: "innhold",
      validation: (Rule) => Rule.required().error("Temaet må ha et navn"),
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
    {
      title: "Seksjonering (optional) (Ikke i prod enda)",
      description: "Del inn artiklene i flere seksjoner",
      name: "seksjoner",
      type: "array",
      group: "innhold",
      of: [
        {
          type: "object",
          title: "Seksjon",
          name: "seksjon",
          fields: [
            {
              type: "string",
              name: "title",
              title: "Tittel",
              validation: (Rule) =>
                Rule.required().error("Seksjonen må ha et navn"),
            },
            {
              title: "Beskrivelse",
              name: "beskrivelse",
              type: "riktekst",
            },
            {
              name: "sider",
              type: "array",
              title: "Sider",
              of: [
                {
                  type: "reference",
                  name: "ref",
                  title: "Side",
                  validation: (Rule) =>
                    Rule.required().error("Seksjonen må ha minst en referanse"),
                  to: [{ type: "aksel_artikkel" }],
                  options: {
                    filter: ({ document }) => {
                      console.log(document._id.replace("drafts.", ""));
                      return {
                        filter: "references($refId)",
                        params: {
                          refId: document._id.replace("drafts.", ""),
                        },
                      };
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
