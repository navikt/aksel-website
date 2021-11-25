import { allDocumentTypes } from "../../config";

export default {
  name: "related_pages",
  title: "Relaterte sider",
  type: "object",
  fields: [
    {
      title: "Sider",
      name: "links",
      type: "array",
      validation: (Rule) => Rule.required().max(6),
      of: [
        {
          title: "Lenke",
          name: "link",
          type: "object",
          fields: [
            {
              title: "Tittel",
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required().max(30),
            },
            {
              title: "Beskrivelse",
              name: "description",
              type: "string",
              validation: (Rule) => Rule.required().max(100),
            },
            {
              title: "Intern side i Sanity",
              name: "internal",
              type: "boolean",
              option: {
                layout: "checkbox",
              },
              validation: (Rule) => Rule.required(),
              initialValue: false,
            },
            {
              title: "Lenke til Intern sanity-side",
              name: "internal_link",
              type: "reference",
              to: [...allDocumentTypes.map((x) => ({ type: x }))],
              hidden: ({ parent }) => !parent?.internal,
            },
            {
              title: "Lenke til ekstern side",
              name: "external_link",
              type: "url",
              hidden: ({ parent }) => parent?.internal,
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Relaterte sider" };
    },
  },
};
