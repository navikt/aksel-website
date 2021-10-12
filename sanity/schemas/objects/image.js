import { Picture } from "@navikt/ds-icons";

export default {
  title: "Bilde",
  name: "picture",
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
      validation: (Rule) => Rule.required(),
      description: "Beskriv bildet for skjermlesere",
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "caption",
      title: "Bilde-tekst",
      description: "Dette vil stå under bildet",
      type: "string",
      options: {
        isHighlighted: true,
      },
    },
  ],
};
