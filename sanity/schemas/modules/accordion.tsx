import { Expand } from "@navikt/ds-icons";
import { innholdFieldNewNested } from "@/lib";
import React from "react";

export default {
  name: "accordion_v2",
  title: "Accordion",
  type: "object",
  fields: [
    { title: "Tittel (optional)", type: "string", name: "title" },
    {
      title: "Accordions",
      name: "list",
      type: "array",
      of: [
        {
          title: "Accordion",
          name: "element",
          type: "object",
          fields: [
            {
              title: "Tittel ",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Accordion må ha en tittel"),
            },
            innholdFieldNewNested("content", "riktekst_aksel"),
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare(selection) {
              return {
                title: selection.title ?? "",
                media: () => <Expand />,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("Accordion modul må ha minst 1 element"),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(s) {
      return {
        title: s?.title ? s.title : "Accordion",
        subtitle: s?.title ? "Accordion" : "",
      };
    },
  },
};
