export default {
  name: "changelog",
  title: "Changelog",
  type: "object",
  fields: [
    {
      type: "array",
      name: "changes",
      title: "Endringer",
      description: "Liste over endringer",
      of: [{ type: "changelog.change" }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    prepare: () => ({ title: "Changelog" }),
  },
};

export const change = {
  name: "changelog.change",
  title: "Endring",
  type: "object",
  fields: [
    {
      title: "Tittel for endring",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Pull request (optional)",
      name: "pull_request",
      type: "url",
    },
    {
      name: "body",
      title: "Tekst",
      description: "Beskrivelse av hva endringen gjorde",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({ title: title }),
  },
};
