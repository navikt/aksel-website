import { Hamburger } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Generisk blokk",
  name: "generisk_blokk",
  type: "object",
  fields: [
    {
      title: "Tittel (h2)",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().error("Blokken må ha en tittel"),
    },
    {
      title: "Paragraf (optional)",
      name: "paragraf",
      type: "riktekst",
      hidden: ({ parent }) => !parent.title,
    },
    {
      type: "array",
      name: "brikker",
      title: "Brikker",
      of: [
        {
          type: "object",
          title: "Riktekst Brikke",
          name: "riktekst_brikke",
          fields: [
            {
              name: "title",
              title: "Tittel (h3)",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Riktekst må ha en tittel"),
            },
            {
              title: "Riktekst",
              name: "body",
              type: "riktekst",
              hidden: ({ parent }) => !parent.title,
            },
          ],
        },
        { type: "tips", title: "Tips" },
        { type: "related_pages", title: "Relatert innhold" },
      ],
      hidden: ({ parent }) => !parent.title,
      validation: (Rule) =>
        Rule.required().error("Generiske blokker må ha minst en brikke"),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
        subtitle: "Generisk blokk",
        media: () => <Hamburger />,
      };
    },
  },
};
