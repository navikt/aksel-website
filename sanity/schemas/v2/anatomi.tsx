import { Ruler, SignLanguageTwoHands } from "@navikt/ds-icons";
import React from "react";

const Seksjon = (nested = false) => {
  const fields: any[] = [
    {
      title: "Nested",
      name: "nested",
      type: "boolean",
      initialValue: nested,
      readOnly: true,
      hidden: true,
    },
    {
      title: "Tittel (h2)",
      name: "title",
      type: "string",
      initialValue: "Anatomi",
      readOnly: true,
      hidden: nested,
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
  ];

  !nested &&
    fields.push({
      type: "array",
      name: "extra",
      title: "Ekstra anatomi-paneler (optional)",
      description:
        "Kan legge til flere anatomi-paneler under samme Anatomi-heading",
      of: [Seksjon(true)],
    });

  return {
    title: "Anatomi",
    name: "anatomi_seksjon",
    type: "object",
    fields,
    preview: {
      prepare() {
        return {
          title: "Anatomi",
          media: () => <Ruler />,
        };
      },
    },
  };
};

const Anatomi = Seksjon();

export default Anatomi;
