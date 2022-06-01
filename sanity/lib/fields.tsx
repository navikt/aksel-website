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

export const UnderArbeidField = {
  title: "Under arbeid",
  name: "under_arbeid",
  description:
    "Hvis checked og publisert vil siden vises som under arbeid uten at lenker treffer 404",
  type: "object",
  group: "settings",
  fields: [
    {
      title: "Er under arbeid?",
      name: "status",
      type: "boolean",
      initialValue: false,
    },
    {
      title: "Forklaring",
      description: "Default: Siden blir for tiden oppdatert!",
      name: "forklaring",
      type: "text",
      rows: 2,
      hidden: ({ parent }) => !parent.status,
    },
  ],
};

export const introField = {
  title: "Kort Intro/Oppsummering",
  description: "Brukes i kort og innganger",
  name: "oppsummering",
  type: "string",
  group: "innhold",
};

export const ingressField = {
  title: "Ingress",
  name: "ingress",
  description: "Side, innganger og seo description-tag",
  type: "text",
  group: "innhold",
  rows: 3,
  validation: (Rule) =>
    Rule.required().max(155).error("Ingress kan ikke være på over 155 tegn"),
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
    { type: "tips", title: "Tips/Feedback", icon: () => <LightBulb /> },
    {
      type: "relatert_innhold",
      title: "Relatert innhold",
      icon: () => <NewTab />,
    },
  ],
};

export const hidePageFeedback = {
  title: "Tilbakemeldinger",
  name: "metadata_feedback",
  type: "object",
  group: "settings",
  fields: [
    {
      title: "Skjul artikkel feedback modul",
      description: "Gjemmer <<Var denne artikkelen til hjelp?>> modulen.",
      name: "hide_feedback",
      type: "boolean",
      initialValue: false,
    },
  ],
};
