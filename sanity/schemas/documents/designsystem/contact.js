export default {
  title: "Meldinger",
  name: "ds_contact",
  type: "document",
  fields: [
    {
      title: "Kommentar",
      name: "comment",
      type: "text",
      readOnly: true,
    },
    {
      title: "Mail",
      name: "mail",
      type: "string",
      readOnly: true,
    },
    {
      name: "done",
      type: "boolean",
      title: "Er medlingen håndtert?",
      initialValue: false,
    },
    {
      name: "notes",
      type: "text",
      title: "Interne notater",
      description: "Hva gjorde vi med denne medlingen?",
    },
  ],
  preview: {
    select: {
      comment: "page.title",
      mail: "feedbacktype",
    },
    prepare(selection) {
      const { comment, mail } = selection;
      return {
        title: comment,
        subtitle: mail,
      };
    },
  },
};
