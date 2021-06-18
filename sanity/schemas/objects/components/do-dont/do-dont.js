export default {
  title: "Do / Dont",
  name: "do_dont",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      /* validation: (Rule) => Rule.required(), */
    },
    {
      title: "Do",
      name: "do_dont_do",
      type: "image",
    },
    {
      title: "Dont",
      name: "do_dont_dont",
      type: "image",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({ title: "Do-dont: " + title }),
  },
};
