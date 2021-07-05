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
      description: "Sidetittel (H1)",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "url / slug",
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
        ],
        layout: "radio",
      },
    },
    {
      title: "Npm-pakke lenke (optional)",
      name: "npm_link",
      type: "url",
    },
    {
      title: "Github-kode lenke (optional)",
      name: "github_link",
      type: "url",
    },
    {
      title: "Figma lenke (optional)",
      name: "figma_link",
      type: "url",
    },
    {
      title: "Kontaktperson (optional)",
      description: "Linker dokumentet til en person (bare internt i sanity)",
      name: "contact",
      type: "reference",
      description: "Kobler en person som kontaktperson til denne siden",
      to: [{ type: "contact_person" }],
    },
    {
      title: "Versjon (optional)",
      description: "Kobler komponenten mot en predefinert versjon",
      name: "version",
      type: "reference",
      description: "Viser hvilken versjon denne komponenten er",
      to: [{ type: "component_versions" }],
    },
    {
      name: "usage",
      type: "blockContent",
      title: "Bruk-tab",
    },
    {
      name: "design",
      type: "blockContent",
      title: "Design-tab",
    },
    {
      name: "development",
      type: "blockContent",
      title: "Utvikling-tab",
    },
    {
      name: "accessibility",
      type: "blockContent",
      title: "Tilgjengelighet-tab",
    },
  ],
};
