import {
  defaultDocPreview,
  editorField,
  groups,
  hidePageFeedback,
  innholdFieldNew,
  innholdFieldNewNested,
  publishedAtField,
  sanitySlug,
  titleField,
  toPlainText,
  UnderArbeidField,
} from "@/lib";
import { FileContent, LightBulb, NewTab, Star } from "@navikt/ds-icons";
import React from "react";

const prefix = "designsystem/side/";

const riktekst = {
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
};

export default {
  title: "Artikkel",
  name: "ds_artikkel",
  type: "document",
  groups,
  ...defaultDocPreview,
  fields: [
    publishedAtField,
    editorField,
    titleField,
    UnderArbeidField,
    sanitySlug(prefix, 3),
    {
      type: "boolean",
      name: "artikkel_type",
      title: "Bruk Tabs",
      group: "innhold",
      initialValue: false,
    },
    { ...innholdFieldNew, hidden: ({ document }) => !!document?.artikkel_type },
    {
      name: "content_tabs",
      title: "Innhold i Tabs",
      type: "array",
      group: "innhold",
      hidden: ({ document }) => !document?.artikkel_type,
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
            innholdFieldNewNested(),
          ],
        },
      ],
    },
    {
      name: "innhold",
      type: "array",
      title: "Innhold",
      group: "innhold",
      hidden: ({ document }) => !!document?.artikkel_type,
      of: [
        {
          name: "generisk_seksjon",
          type: "generisk_seksjon",
          icon: () => <FileContent />,
        },
        riktekst,
        { type: "tips", title: "Tips/Feedback", icon: () => <LightBulb /> },
        {
          type: "relatert_innhold",
          title: "Relatert innhold",
          icon: () => <NewTab />,
        },
        {
          type: "spesial_seksjon",
          title: "Spesial seksjon",
          icon: () => <Star />,
        },
      ],
    },
    {
      name: "innhold_tabs",
      title: "Innhold i Tabs",
      type: "array",
      group: "innhold",
      hidden: ({ document }) => !document?.artikkel_type,
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
                Rule.required().error("Tabben må ha noe innhold"),
              of: [
                {
                  name: "generisk_seksjon",
                  type: "generisk_seksjon",
                  icon: () => <FileContent />,
                },
                riktekst,
                {
                  type: "tips",
                  title: "Tips/Feedback",
                  icon: () => <LightBulb />,
                },
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
    hidePageFeedback,
  ],
};
