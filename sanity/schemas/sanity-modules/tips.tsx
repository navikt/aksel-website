import { LightBulb } from "@navikt/ds-icons";
import React from "react";

function toPlainText(blocks = []) {
  return blocks
    .filter((block) => !(block._type !== "block" || !block.children))
    .map((block) => {
      return block.children.map((child) => child.text).join("");
    })
    .join("\n");
}

export default {
  name: "tips",
  title: "Tips",
  type: "object",
  fields: [
    {
      title: "Innhold",
      name: "body",
      type: "blockContent_simple",
      validation: (Rule) =>
        Rule.required().error("Tips-modul må ha noe innhold"),
    },
  ],
  preview: {
    select: {
      body: "body",
    },
    prepare(selection) {
      return {
        title: toPlainText(selection?.body ?? []) ?? "",
        subtitle: "Tips",
        media: () => <LightBulb />,
      };
    },
  },
};
