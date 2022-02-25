/*
  Toggle for høyre, ventstrestilt bilde.
*/
import { Picture } from "@navikt/ds-icons";

export default {
  title: "Bilde med tekst",
  name: "picture_text",
  type: "image",
  icon: Picture,
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "title",
      title: "Alt-tekst",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Bilde med tekst må ha en alt-tekst"),
      description: "Beskriv bildet for skjermlesere",
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "placement",
      title: "Bilde plassering",
      type: "string",
      options: {
        list: [
          { title: "Høyre", value: "right" },
          { title: "Venstre", value: "left" },
        ],
        layout: "radio",
        isHighlighted: true,
      },
      initialValue: "left",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Innhold",
      name: "body",
      type: "riktekst_enkel",
      validation: (Rule) =>
        Rule.required().error(
          "Bilde med tekst må ha noe tekst lagt ved bildet"
        ),
      options: {
        isHighlighted: true,
      },
    },
  ],
};
