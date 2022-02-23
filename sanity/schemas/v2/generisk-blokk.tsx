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

function toPlainText(blocks = []) {
  return blocks
    .filter((block) => !(block._type !== "block" || !block.children))
    .map((block) => {
      return block.children.map((child) => child.text).join("");
    })
    .join("\n");
}

export const contentBlocks = (s?: string) => {
  const blocks = [
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
    { type: "kode", title: "Kode", icon: () => <Wrench /> },
    {
      title: "Komponent-widget",
      name: "kode_ref",
      type: "reference",
      to: [{ type: "ds_code_example" }],
      icon: () => <Facilitet />,
    },
    { type: "tabell", title: "Tabell", icon: () => <Data /> },
    { type: "accordion_v2", title: "Accordion", icon: () => <Expand /> },
    {
      type: "spesial_seksjon",
      title: "Spesial seksjon",
      icon: () => <Star />,
    },
  ];

  switch (s) {
    case "accordion_v2":
      return blocks.filter(
        (x) =>
          !["Accordion", "Komponent-widget", "Spesial seksjon"].includes(
            x.title
          )
      );
    case "enkel":
      return blocks.filter(
        (x) => !["Komponent-widget", "Spesial seksjon"].includes(x.title)
      );
    default:
      return blocks;
  }
};

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
      of: contentBlocks(),
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
