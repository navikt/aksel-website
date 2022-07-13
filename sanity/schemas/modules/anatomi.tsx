import { Ruler, SignLanguageTwoHands } from "@navikt/ds-icons";
import React from "react";

const Seksjon = (nested = false) => {
  const fields: any[] = [
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
                Rule.required().error("Anatomi må forklare bildet"),
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

  return {
    title: "Anatomi",
    name: "anatomi",
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
