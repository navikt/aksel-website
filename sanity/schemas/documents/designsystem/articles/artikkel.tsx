import {
  defaultDocPreview,
  editorField,
  groups,
  hidePageFeedback,
  innholdFieldNew,
  innholdFieldNewNested,
  migratedField,
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
    migratedField,
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
    {
      ...innholdFieldNew,
      type: "riktekst_ds_artikkel",
      hidden: ({ document }) => !!document?.artikkel_type,
    },
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
    hidePageFeedback,
  ],
};
