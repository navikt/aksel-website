import { Home } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Intro",
  name: "intro_komponent",
  type: "object",
  fields: [
    {
      title: "Intro-tekst",
      name: "body",
      type: "riktekst_enkel",
      validation: (Rule) =>
        Rule.required().error("Komponentintro må ha en intro"),
    },
    {
      type: "array",
      name: "brukes_til",
      title: "Egnet til",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      type: "array",
      name: "brukes_ikke_til",
      title: "Når bør man vurdere noe annet (optional)",
      of: [{ type: "string" }],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare() {
      return {
        title: "Komponent-intro",
        media: () => <Home />,
      };
    },
  },
};
