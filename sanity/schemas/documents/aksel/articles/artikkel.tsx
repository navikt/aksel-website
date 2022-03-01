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

const prefix = "artikkel/";

export default {
  title: "Aksel Artikkel",
  name: "aksel_artikkel",
  type: "document",
  groups: [...groups],
  ...defaultPreview(),
  fields: [
    {
      title: "Redaktører",
      description: "Legg til de som har bidratt med denne siden!",
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
        Rule.required().max(40).error("Siden må ha en kort heading (<h1>)"),
    },
    {
      title: "url",
      name: "slug",
      type: "slug",
      description: "Strukturen bestemmes ikke av URL-en",
      validation: (Rule) => validateSlug(Rule, prefix, 2),
      group: "settings",
      inputComponent: SlugInput,
      options: {
        basePath: "design.nav.no",
        isUnique: isSlugUnique,
        source: "heading",
        slugify: (input) =>
          `${prefix}${input}`.toLowerCase().replace(/\s+/g, "-").slice(0, 70),
      },
    },
    {
      title: "Tema",
      description: "Legg til de viktigeste temaene",
      name: "tema",
      type: "array",
      of: [{ type: "reference", to: [{ type: "aksel_tema" }] }],
      group: "innhold",
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
          .error("Artikkelen burde ha en kort oppsummering/intro"),
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
    documentFeedbackMetadata,
  ],
};
