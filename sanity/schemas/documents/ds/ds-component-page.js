import { validateSlug, isSlugUnique } from "../../validateSlug";

const prefix = "designsystem/komponent/";

export default {
  title: "Komponentside",
  name: "ds_component_page",
  type: "document",
  //__experimental_actions: [, /* "create" */ "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "Dokument tittel (for søk internt i sanity)",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Tittel",
      name: "heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "url / slug",
      name: "slug",
      type: "slug",
      validation: (Rule) => validateSlug(Rule, prefix, 3),
      options: {
        isUnique: isSlugUnique,
        source: "heading",
        slugify: (input) =>
          `${prefix}${input}`.toLowerCase().replace(/\s+/g, "-").slice(0, 50),
      },
    },
    {
      title: "Ingress",
      name: "ingress",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Status",
      name: "status",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { value: "published", title: "Publisert" },
          { value: "beta", title: "Beta" },
          { value: "wip", title: "WIP" },
        ],
        layout: "radio",
      },
    },
    {
      title: "Npm link",
      name: "npm_link",
      type: "url",
    },
    {
      title: "Github link",
      name: "github_link",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Figma link",
      name: "figma_link",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Kontaktperson",
      name: "contact",
      type: "reference",
      description: "Kobler en person som kontaktperson til denne siden",
      to: [{ type: "contact_person" }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Versjon",
      name: "version",
      type: "reference",
      description: "Viser hvilken versjon denne komponenten er",
      to: [{ type: "component_versions" }],
    },
    {
      name: "usage",
      type: "blockContent",
      title: "Bruk",
    },
    {
      name: "design",
      type: "blockContent",
      title: "Design",
    },
    {
      name: "development",
      type: "blockContent",
      title: "Utvikling",
    },
    {
      name: "accessibility",
      type: "blockContent",
      title: "Tilgjengelighet",
    },
  ],
};
