import { SignLanguageTwoHands } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Tilgjengelighet",
  name: "uu_seksjon",
  type: "object",
  fields: [
    {
      title: "Tittel (h2)",
      name: "title",
      type: "string",
      initialValue: "Tilgjengelighet",
      readOnly: true,
    },
    {
      title: "Atributter (optional)",
      name: "atributter",
      type: "riktekst_enkel",
    },
    {
      title: "Interaksjon med mus (optional)",
      name: "interaksjon_mus",
      type: "riktekst_enkel",
    },
    {
      title: "Interaksjon med touch (optional)",
      name: "interaksjon_touch",
      type: "riktekst_enkel",
    },
    {
      title: "Interaksjon med tastatur (optional)",
      description: "Ekstra info som ikke kan forklares med key + action under",
      name: "interaksjon_tastatur",
      type: "riktekst_enkel",
    },
    {
      type: "array",
      name: "tastatur",
      title: "Tastatur key + action",
      of: [
        {
          type: "object",
          name: "keys",
          fields: [
            { type: "string", name: "key" },
            { type: "string", name: "action" },
          ],
          validation: (Rule) => Rule.required(),
          options: {
            columns: "2",
          },
        },
      ],
    },
    {
      title: "Interaksjon med skjermleser (optional)",
      name: "interaksjon_skjermleser",
      type: "riktekst_enkel",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Tilgjengelighet",
        media: () => <SignLanguageTwoHands />,
      };
    },
  },
};
