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
