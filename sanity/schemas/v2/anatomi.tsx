import { Ruler, SignLanguageTwoHands } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Anatomi",
  name: "anatomi_seksjon",
  type: "object",
  fields: [
    {
      title: "Tittel (h2)",
      name: "title",
      type: "string",
      initialValue: "Anatomi",
      readOnly: true,
    },
    {
      title: "Intro (optional)",
      name: "intro",
      type: "riktekst_enkel",
    },
    {
      title: "Anatomi-bilde",
      name: "bilde",
      type: "bilde",
      validation: (Rule) => Rule.required().error("Anatomi må ha et bilde"),
      initialValue: {
        hide_floating: true,
      },
    },
    {
      type: "array",
      name: "forklaring",
      title: "Forklaring",
      description: "Forklar annoteringen av anatomi-bildet",
      validation: (Rule) =>
        Rule.required().error("Anatomi må ha en forklaring"),
      of: [
        {
          type: "object",
          name: "liste_element",
          fields: [
            {
              title: "Element",
              name: "element",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Anatimi må forklare bildet"),
            },
            {
              title: "Beskrivelse (optional)",
              name: "beskrivelse",
              type: "riktekst_enkel",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Anatomi",
        media: () => <Ruler />,
      };
    },
  },
};
