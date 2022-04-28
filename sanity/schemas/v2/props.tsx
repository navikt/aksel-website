import { Download, Scale } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Props",
  name: "props_seksjon",
  type: "object",
  fields: [
    {
      title: "Tittel (h2)",
      name: "title",
      type: "string",
      initialValue: "Props",
      readOnly: true,
    },
    {
      title: "Elementer",
      name: "elementer",
      type: "array",
      of: [{ type: "prop_table" }],
      validation: (Rule) =>
        Rule.required().error("Må ha props for minst et element"),
    },
    {
      title: "Props",
      type: "array",
      name: "komponenter",
      of: [
        {
          title: "Komponent",
          type: "object",
          name: "komponent",
          fields: [
            {
              title: "Komponent navn",
              description: "Slik man ville brukt den, eks Accordion.Item",
              type: "string",
              name: "title",
            },
            {
              title: "Bruker komponenten OverridableComponent API-et",
              type: "boolean",
              name: "overridable",
              initialValue: false,
            },
            {
              name: "propref",
              title: "Komponent referanse",
              type: "reference",
              to: [{ type: "ds_props" }],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Props",
        media: () => <Scale />,
      };
    },
  },
};
