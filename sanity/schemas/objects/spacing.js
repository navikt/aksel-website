import { Alert } from "@navikt/ds-react";
import React from "react";

export default {
  name: "spacing",
  title: "Spacing",
  type: "object",
  fields: [
    {
      title: "Spacing-verdi",
      name: "space",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "s-4",
      options: {
        layout: "radio",
        list: [
          { value: "s-4", title: "S-4" },
          { value: "s-8", title: "S-8" },
          { value: "s-12", title: "S-12" },
          { value: "s-16", title: "S-16" },
        ],
      },
    },
  ],
  preview: {
    select: {
      space: "space",
    },
    prepare({ space }) {
      return { title: space };
    },
  },
};
