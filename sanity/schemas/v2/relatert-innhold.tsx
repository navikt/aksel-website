import { allDocumentTypes } from "../../config";

export default {
  name: "relatert_innhold",
  title: "Relatert Innhold",
  type: "object",
  fields: [
    {
      title: "Lenker til innhold",
      name: "lenker",
      type: "array",
      validation: (Rule) =>
        Rule.required().max(4).error("Kan ha maks 4 relaterte lenker"),
      of: [
        {
          title: "Lenke",
          name: "lenke",
          type: "object",
          fields: [
            {
              title: "Tittel",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required()
                  .max(40)
                  .error("Tittelen kan være på maks 35 tegn"),
            },
            {
              title: "Beskrivelse",
              name: "description",
              type: "string",
              validation: (Rule) =>
                Rule.required()
                  .max(60)
                  .error("Teksten kan være på maks 60 tegn"),
            },
            {
              title: "Intern side i Sanity",
              name: "intern",
              type: "boolean",
              option: {
                layout: "checkbox",
              },
              validation: (Rule) => Rule.required(),
              initialValue: false,
            },
            {
              title: "Lenke til Intern sanity-side",
              name: "intern_lenke",
              type: "reference",
              to: [...allDocumentTypes.map((x) => ({ type: x }))],
              hidden: ({ parent }) => !parent?.intern,
            },
            {
              title: "Lenke til ekstern side",
              name: "ekstern_link",
              type: "url",
              hidden: ({ parent }) => parent?.intern,
            },
            {
              title: "Linker til et eksternt domene",
              name: "ekstern_domene",
              type: "boolean",
              initialValue: false,
              hidden: ({ parent }) => parent?.intern,
            },
            {
              title: "Tagging",
              name: "tags",
              type: "string",
              initialValue: "none",
              hidden: ({ parent }) => !parent?.intern,
              options: {
                list: [
                  {
                    value: "none",
                    title: "Ingen tag",
                  },
                  {
                    value: "custom",
                    title: "Custom",
                  },
                ],
              },
            },
            {
              title: "Tag",
              name: "tag",
              type: "string",
              hidden: ({ parent }) =>
                parent?.tags === "none" || parent.ekstern_domene,
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      links: "links",
    },
    prepare(s) {
      return { title: "Relatert innhold kort" };
    },
    /*   component: (s) => {
      return (
        <span>
          <NewTab /> Relaterte sider
          {s?.links?.map((x) => {
            console.log(x);
            return <div>{x?.link?.title}</div>;
          })}
        </span>
      );
    }, */
  },
};
