import { FileContent, LightBulb, NewTab } from "@navikt/ds-icons";
import React from "react";
import SlugInput from "sanity-plugin-better-slug";
import { isSlugUnique, validateSlug } from "../../../validateSlug";
import {
  defaultPreview,
  documentFeedbackMetadata,
  groups,
} from "../../templates";

function toPlainText(blocks = []) {
  return blocks
    .filter((block) => !(block._type !== "block" || !block.children))
    .map((block) => {
      return block.children.map((child) => child.text).join("");
    })
    .join("\n");
}

const prefix = "blogg/";

export default {
  title: "Blogg",
  name: "aksel_blogg",
  type: "document",
  groups: [...groups],
  ...defaultPreview(),
  fields: [
    {
      title: "Redaktører",
      description: "Øverste redaktør vil vises med navn på artikkel",
      name: "contributors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "editor" }] }],
      group: "settings",
    },
    {
      title: "Sidetittel",
      name: "heading",
      type: "string",
      group: "innhold",
      description:
        "Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.",
      validation: (Rule) =>
        Rule.required().max(60).error("Siden må ha en kort heading (<h1>)"),
    },
    {
      title: "url",
      name: "slug",
      type: "slug",
      validation: (Rule) => validateSlug(Rule, prefix, 2),
      group: "settings",
      inputComponent: SlugInput,
      options: {
        basePath: "design.nav.no",
        isUnique: isSlugUnique,
        source: "heading",
        slugify: (input) =>
          `${prefix}${input}`
            .toLowerCase()
            .trim()
            .slice(0, 70)
            .trim()
            .replace(/\s+/g, "-"),
      },
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
          .error(
            "Artikkelen burde ha en kort oppsummering/intro på max 65 tegn"
          ),
    },
    {
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
    },
    {
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
    },
    documentFeedbackMetadata,
  ],
};
