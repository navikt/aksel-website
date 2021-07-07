/* https://github.com/navikt/detsombetyrnoe/blob/main/sanity/schemas/metadata.js */
export default {
  type: "document",
  name: "metadata",
  fields: [
    {
      title: "Tittel som dukker opp på google",
      description: "Eks: Verktøykassen til nav",
      name: "title",
      type: "string",
    },
    {
      title: "Beskrivelse som dukker opp under tittelen på google",
      description: "Eks: Verktøykassen til nav gjør x og y for å forbedre z",
      name: "description",
      type: "text",
      rows: 3,
    },
    {
      title: "Preview-bilde som kan dukke opp på søk",
      name: "previewImage",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
