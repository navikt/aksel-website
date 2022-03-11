export default {
  title: "Forside",
  name: "vk_frontpage",
  type: "document",
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Beskrivelse",
      name: "beskrivelse",
      type: "riktekst",
      validation: (Rule) => Rule.required(),
    },
  ],
};
