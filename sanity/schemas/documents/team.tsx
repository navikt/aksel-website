import { CoApplicant } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Team",
  name: "team",
  type: "document",
  fields: [
    {
      title: "Navn",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().error("Må legge til navn"),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
        media: () => <CoApplicant />,
      };
    },
  },
};
