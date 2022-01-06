export default {
  title: "Situasjoner",
  name: "gp_situations",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Situasjoner",
      validation: (Rule) => Rule.required(),
      readOnly: true,
      hidden: true,
      initialValue: () => "Situasjoner",
    },
    {
      name: "situations",
      type: "array",
      title: "Situasjoner med faser",
      of: [
        {
          name: "situation_list",
          type: "object",
          fields: [
            {
              title: "Situasjon",
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              title: "Faser",
              name: "phases",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "fields",
      type: "array",
      title: "Fagfelt",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
};
