import {
  DirectionSign,
  FileContent,
  LightBulb,
  NewTab,
  Picture,
  Warning,
} from "@navikt/ds-icons";
import React from "react";

function toPlainText(blocks = []) {
  return blocks
    .filter((block) => !(block._type !== "block" || !block.children))
    .map((block) => {
      return block.children.map((child) => child.text).join("");
    })
    .join("\n");
}

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
      of: [
        {
          type: "object",
          title: "Riktekst",
          name: "riktekst_blokk",
          fields: [
            {
              title: "Riktekst",
              name: "body",
              type: "riktekst",
            },
          ],
          preview: {
            select: {
              text: "body",
            },
            prepare(selection) {
              return {
                title: toPlainText(selection?.text?.slice?.(0, 1)) ?? "-",
                subtitle: "Riktekst",
              };
            },
          },
          icon: () => <FileContent />,
        },
        { type: "tips", title: "Tips", icon: () => <LightBulb /> },
        {
          type: "relatert_innhold",
          title: "Relatert innhold",
          icon: () => <NewTab />,
        },
        { type: "do_dont_v2", title: "Do/Dont", icon: () => <DirectionSign /> },
        { type: "bilde", title: "Bilde", icon: () => <Picture /> },
        { type: "alert_v2", title: "Alert", icon: () => <Warning /> },
        { type: "kode", title: "Kode" },
        { type: "powerTable", title: "Tabell" },
      ],
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
        media: () => <span>H2</span>,
      };
    },
  },
};
