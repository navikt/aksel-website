import { Helmet } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Live demo",
  name: "live_demo_seksjon",
  type: "object",
  fields: [
    {
      title: "Avsnitt (optional)",
      name: "body",
      type: "riktekst_enkel",
    },
    {
      type: "boolean",
      name: "erstatt",
      title: "Erstatt Sandbox med vanlig kode-eksempel",
      initialValue: false,
    },
    {
      title: "Demo/Sandobox",
      name: "sandbox_ref",
      type: "reference",
      to: [{ type: "ds_code_sandbox" }],
      hidden: ({ parent }) => parent?.erstatt,
    },
    {
      title: "Kode-eksempel",
      name: "code_ref",
      type: "reference",
      to: [{ type: "ds_code_example" }],
      hidden: ({ parent }) => !parent?.erstatt,
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
