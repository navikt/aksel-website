import { Expand } from "@navikt/ds-icons";
import { Accordion } from "@navikt/ds-react";
import React from "react";
import { contentBlocks } from "./generisk-blokk";

function toPlainText(blocks = []) {
  return blocks
    .filter((block) => !(block._type !== "block" || !block.children))
    .map((block) => {
      return block.children.map((child) => child.text).join("");
    })
    .join("\n");
}

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
            {
              title: "Innhold",
              name: "innhold",
              type: "array",
              validation: (Rule) =>
                Rule.required().error("Accordion må ha noe innhold"),
              of: contentBlocks("accordion_v2"),
            },
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
