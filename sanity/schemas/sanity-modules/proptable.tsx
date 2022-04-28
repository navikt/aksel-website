import { Scale } from "@navikt/ds-icons";
import React from "react";

export default {
  name: "prop_table",
  title: "Proptable",
  type: "object",
  fields: [
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
    /* {
      title: "Komponent navn",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().error("Proptable må ha et tittel"),
    },
    {
      title: "children-prop required av type React.ReactNode",
      name: "preset_children",
      type: "boolean",
      options: {
        layput: "checkbox",
      },
      initialValue: true,
    },
    {
      title: "className-prop",
      name: "preset_classname",
      type: "boolean",
      options: {
        layput: "checkbox",
      },
      initialValue: true,
    },
    {
      type: "array",
      name: "props",
      title: "Props",
      description: "Liste med props, tilsvarer en rad i tabellen",
      of: [{ type: "prop_table_prop" }],
    },
    {
      title: "Bruker OverridableComponent",
      name: "overridable",
      type: "boolean",
      options: {
        layput: "checkbox",
      },
      initialValue: false,
    },
    {
      title: "Hvor settes ref",
      description: "Eks: root element",
      name: "refplacement",
      type: "string",
      initialValue: "root element",
    },
    {
      title: "Hvilken props ekstender komponent-props",
      description: "Eks: HtmlDivElement, ButtonProps",
      name: "extends",
      type: "string",
      initialValue: "HtmlDivElement",
    }, */
  ],
};
