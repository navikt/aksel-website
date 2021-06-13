export default {
  name: "changelog.change",
  title: "Endring",
  type: "object",
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Pull request",
      name: "pull_request",
      type: "url",
    },
    {
      name: "body",
      title: "Fritekst",
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
