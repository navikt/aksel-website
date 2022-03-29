import { Picture } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Bilde",
  name: "bilde",
  type: "image",
  icon: Picture,
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      title: "Alt-tekst",
      type: "string",
      validation: (Rule) => Rule.required().error("Bilde må ha en alt-tekst"),
      description: "Beskriv bildet for skjermlesere",
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "hide_floating",
      type: "boolean",
      hidden: true,
      readOnly: true,
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "floating",
      title: "Bilde med flytende tekst rundt",
      description:
        "Dette feltet fungerer ikke lengre, bruk et vanlig bilde uten flytende tekst",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.hide_floating,
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "caption",
      title: "Bilde-tekst (optional)",
      description: "Dette vil stå under bildet",
      type: "string",
      hidden: ({ parent }) => parent?.floating,
      options: {
        isHighlighted: true,
      },
    },
    {
      title: "Plassering av bilde",
      name: "floating_align",
      type: "string",
      hidden: ({ parent }) => !parent?.floating,

      initialValue: "hoyre",
      options: {
        isHighlighted: true,
        layout: "radio",
        list: [
          { value: "venstre", title: "Venstre" },
          { value: "hoyre", title: "Hoyre" },
        ],
      },
    },
    {
      name: "floating_text",
      title: "Flytende tekst",
      type: "riktekst",
      hidden: ({ parent }) => !parent?.floating,
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "small",
      title: "Bildet tar bare ~halve bredden",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.floating,
      options: {
        isHighlighted: true,
      },
    },
  ],
  validation: (Rule) =>
    Rule.custom((v) => {
      return v?.asset ? true : "Må legge til et bilde";
    }).error(),
  preview: {
    select: {
      alt: "alt",
      floating: "floating",
    },
    prepare(selection) {
      return {
        title: selection?.alt,
        subtitle: `Bilde${selection?.floating ? " - Flytende med tekst" : ""}`,
        media: () => <Picture />,
      };
    },
  },
};
