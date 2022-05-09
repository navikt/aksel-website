import { FileContent, LightBulb, NewTab } from "@navikt/ds-icons";
import React from "react";
import { toPlainText } from ".";

export const editorField = {
  title: "Redaktører",
  description: "Legg til alle som har bidratt med denne siden!",
  name: "contributors",
  type: "array",
  of: [{ type: "reference", to: [{ type: "editor" }] }],
  group: "settings",
};

export const titleField = {
  title: "Sidetittel",
  name: "heading",
  type: "string",
  group: "innhold",
  description:
    "Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.",
  validation: (Rule) =>
    Rule.required()
      .max(60)
      .error("Siden bør ha en kort og konsis heading (<h1>)"),
};

export const introField = {
  title: "Kort Intro/Oppsummering",
  description: "Brukes i kort og innganger",
  name: "oppsummering",
  type: "string",
  group: "innhold",
  validation: (Rule) =>
    Rule.required()
      .max(70)
      .error("Artikkelen burde ha en kort oppsummering/intro på max 70 tegn"),
};

export const innholdField = {
  name: "innhold",
  type: "array",
  title: "Innhold",
  group: "innhold",
  validation: (Rule) =>
    Rule.required().min(1).error("Tabben må ha noe innhold"),
  of: [
    {
      name: "generisk_seksjon",
      type: "generisk_seksjon_artikkel",
      icon: () => <FileContent />,
    },
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
  ],
};

export const bannerField = {
  type: "object",
  name: "banner",
  title: "Banner",
  group: "banner",
  fields: [
    {
      title: "Variant",
      name: "variant",
      type: "string",
      initialValue: "standard",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Bilde", value: "bilde" },
        ],
        layout: "radio",
      },
    },
    {
      title: "Banner-bilde",
      name: "banner_img",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.variant !== "bilde",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt-tekst",
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
  ],
};
