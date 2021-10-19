import { validateSlug, isSlugUnique } from "../../validateSlug";

export function documentInformation(prefix) {
  return [
    {
      title: "Dokument tittel (Bare for søk internt i Sanity)",
      description:
        "Bruke en beskrivende tittel slik at det er lett å finne siden.",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Sidetittel",
      name: "heading",
      type: "string",
      description: "Blir satt som `<H1 />` på toppen av siden",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "url",
      name: "slug",
      type: "slug",
      description:
        "Vil bli oppdatert etterhvert når navigasjon og struktur er bestemt..",
      validation: (Rule) => validateSlug(Rule, prefix, 3),
      options: {
        isUnique: isSlugUnique,
        source: "heading",
        slugify: (input) =>
          `${prefix}${input}`.toLowerCase().replace(/\s+/g, "-").slice(0, 50),
      },
    },
    {
      title: "Ingress (optional)",
      name: "ingress",
      type: "text",
      rows: 3,
    },
    {
      title: "Tags",
      description: "Setter en tag på toppen av siden med status",
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { value: "core", title: "Core" },
          { value: "nav", title: "Nav.no" },
          { value: "internal", title: "Intern" },
        ],
      },
      initialValue: ["core"],
    },
    {
      title: "Status",
      description: "Statusen på denne siden/komponenten",
      name: "status",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {
            value: "published",
            title: "Publisert (Bruk denne som standard)",
          },
          { value: "beta", title: "Beta" },
          { value: "wip", title: "WIP" },
          { value: "legacy", title: "Legacy / deprecated" },
        ],
        layout: "radio",
      },
    },
  ];
}
