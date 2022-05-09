import { toPlainText } from "@/lib";
import { LightBulb } from "@navikt/ds-icons";
import React from "react";

export default {
  name: "tips",
  title: "Tips",
  type: "object",
  fields: [
    {
      title: "Innhold",
      name: "body",
      type: "riktekst_enkel",
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
