import { validateSlug, isSlugUnique } from "../../validateSlug";

export function documentInformation(prefix) {
  return [
    {
      title: "Dokument tittel",
      description: "Blir brukt for søk internt i Sanity.",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Heading",
      name: "heading",
      type: "string",
      description: "Sidetittel (H1)",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "url",
      name: "slug",
      type: "slug",
      description: "URLen siden vil ligge under",
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
      type: "string",
    },
    {
      title: "Status",
      description: "Status-badge som vises på siden",
      name: "status",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { value: "published", title: "Publisert" },
          { value: "beta", title: "Beta" },
          { value: "wip", title: "WIP" },
          { value: "legacy", title: "Legacy / deprecated" },
        ],
        layout: "radio",
      },
    },
  ];
}
