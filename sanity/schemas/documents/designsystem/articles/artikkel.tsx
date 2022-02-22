import {
  Download,
  FileContent,
  Helmet,
  Home,
  LightBulb,
  NewTab,
  Ruler,
  Scale,
  SignLanguageTwoHands,
  Star,
} from "@navikt/ds-icons";
import React from "react";
import {
  defaultPreview,
  documentFeedbackMetadata,
  documentInformation,
  groups,
} from "../../templates";

const prefix = "designsystem/side/";

const spesialSeksjon = {
  title: "Spesialseksjon",
  type: "object",
  name: "spesial_seksjon",
  validation: (Rule) => Rule.required(),
  fields: [
    {
      title: "Modul",
      name: "modul",
      type: "string",
      options: {
        list: [
          { title: "Farge kategori", value: "farge_kategori" },
          { title: "Ikonsøk", value: "ikonsok" },
          { title: "Endringslogg", value: "endringslogg" },
          { title: "Komponentoversikt", value: "komponentoversikt" },
        ],
        layout: "radio",
      },
    },
    {
      title: "Farge kategori",
      type: "reference",
      name: "farge_ref",
      hidden: ({ parent }) => parent.modul !== "farge_kategori",
      to: [{ type: "ds_color_categories" }],
    },
  ],
  preview: {
    select: {
      modul: "modul",
    },
    prepare(s) {
      return {
        title: s.modul,
        subtitle: "Spesial seksjon",
        media: () => <Star />,
      };
    },
  },
};

export default {
  title: "Artikkel BETA",
  name: "ds_artikkel",
  type: "document",
  groups: [...groups],
  ...defaultPreview(),
  fields: [
    {
      title: "Bidragsytere",
      description: "Legg til de som har bidratt med denne siden!",
      name: "contributors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "editor" }] }],
      group: "settings",
    },
    ...documentInformation(prefix).filter((x) => x?.name !== "ingress"),
    {
      type: "boolean",
      name: "article_type",
      title: "Bruk Tabs",
      group: "innhold",
      initialValue: false,
    },
    {
      name: "innhold",
      type: "array",
      title: "Innhold",
      group: "innhold",
      hidden: ({ document }) => !!document?.article_type,
      validation: (Rule) =>
        Rule.required().min(1).error("Tabben må ha noe innhold"),
      of: [
        {
          name: "generisk_seksjon",
          type: "generisk_seksjon",
          icon: () => <FileContent />,
        },
        { type: "tips", title: "Tips", icon: () => <LightBulb /> },
        {
          type: "relatert_innhold",
          title: "Relatert innhold",
          icon: () => <NewTab />,
        },
        spesialSeksjon,
      ],
    },
    {
      name: "innhold_tabs",
      title: "Innhold i Tabs",
      type: "array",
      group: "innhold",
      hidden: ({ document }) => !document?.article_type,
      of: [
        {
          name: "tab",
          title: "Tab",
          type: "object",
          fields: [
            {
              title: "Tittel",
              description: "Innhold vil da legges under url/tab-tittel",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Tabben må ha en enkel tittel"),
            },
            {
              name: "innhold",
              type: "array",
              title: "Innhold",
              validation: (Rule) =>
                Rule.required().min(1).error("Tabben må ha noe innhold"),
              of: [
                {
                  name: "generisk_seksjon",
                  type: "generisk_seksjon",
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
          ],
        },
      ],
    },

    documentFeedbackMetadata,
  ],
};
