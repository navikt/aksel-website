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
      validation: (Rule) =>
        Rule.required()
          .max(4)
          .error("Kan ha maks 4 relaterte lenker i samme blokk"),
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
              validation: (Rule) =>
                Rule.required()
                  .max(35)
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
            {
              title: "Tagging",
              description: "Velg hvordan kortet skal tagges",
              name: "tags",
              type: "string",
              initialValue: "default",
              hidden: ({ parent }) => !parent?.internal,
              options: {
                list: [
                  {
                    value: "default",
                    title: "Generisk tag (RELATERT INNHOLD)",
                  },
                  {
                    value: "main_categories",
                    title: "Kategorier (Henter tag fra valgt kategori)",
                  },
                ],
                layout: "radio",
              },
            },
            {
              title: "Kategori",
              name: "category_ref",
              type: "reference",
              to: [{ type: "main_categories" }],
              hidden: ({ parent }) =>
                parent?.tags !== "main_categories" || !parent?.internal,
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
      return { title: "Relaterte sider cards" };
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
