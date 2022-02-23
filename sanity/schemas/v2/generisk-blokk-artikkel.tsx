import {
  Data,
  DirectionSign,
  Expand,
  Facilitet,
  FileContent,
  LightBulb,
  NewTab,
  Picture,
  Star,
  Warning,
  Wrench,
} from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Seksjon med h2",
  name: "generisk_seksjon",
  type: "object",
  fields: [
    {
      title: "Tittel (h2)",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().error("Blokken må ha en tittel"),
    },
    {
      type: "array",
      name: "brikker",
      title: "Innhold",
      of: contentBlocks("enkel"),
      hidden: ({ parent }) => !parent.title,
      validation: (Rule) =>
        Rule.required().error("Seksjon må ha minst en brikke"),
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
        subtitle: "Seksjon med h2",
        media: () => <FileContent />,
      };
    },
  },
};
