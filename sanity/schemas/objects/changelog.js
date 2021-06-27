export default {
  name: "changelog",
  title: "Changelog",
  type: "object",
  fields: [
    {
      type: "array",
      name: "changes",
      title: "Endringer",
      of: [{ type: "changelog.change" }],
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
