import { Helmet } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Live demo",
  name: "live_demo_seksjon",
  type: "object",
  fields: [
    {
      title: "Demo/Sandobox",
      name: "sandbox_ref",
      type: "reference",
      to: [{ type: "ds_code_sandbox" }],
      hidden: ({ parent }) => parent?.erstatt,
      validation: (Rule) =>
        Rule.custom((v, { parent }) => {
          if (!parent.erstatt) {
            return v ? true : "Må velge en sandbox";
          }
          return true;
        }).error(),
    },
  ],
  preview: {
    select: {
      title: "title",
      erstatt: "erstatt",
      code: "code_ref.title",
      sandbox: "sandbox_ref.title",
    },
    prepare(s) {
      return {
        title:
          s.code || s.sandbox ? (s?.erstatt ? s.code : s.sandbox) : "Unknown",
        subtitle: "Live Demo",
        media: () => <Helmet />,
      };
    },
  },
};
