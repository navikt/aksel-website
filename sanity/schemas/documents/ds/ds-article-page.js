import { validateSlug, isSlugUnique } from "../../validateSlug";

const prefix = "designsystem/side/";

export default {
  title: "Artikkelside",
  name: "ds_article_page",
  type: "document",
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
      title: "Kontaktperson (optional)",
      description: "Linker dokumentet til en person (bare internt i sanity)",
      name: "contact",
      type: "reference",
      description: "Kobler en person som kontaktperson til denne siden",
      to: [{ type: "contact_person" }],
    },
    {
      name: "body",
      type: "blockContent",
      title: "Innhold",
      validation: (Rule) => Rule.required(),
    },
  ],
};
