/* import { ExampleKeys } from "website/component-examples"; */

export default {
  title: "Hovedkategorier",
  name: "main_categories",
  type: "document",
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Må legge til en enkel tittel"),
    },
    {
      title: "Pictogram",
      name: "picture",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "title",
          title: "Alt-tekst",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("Bilde må ha en alt-tekst"),
          description: "Beskriv bildet for skjermlesere",
          options: {
            isHighlighted: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().error("Må legge til et pictogram"),
    },
  ],
};
