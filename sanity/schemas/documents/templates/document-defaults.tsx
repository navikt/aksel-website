import { validateSlug, isSlugUnique } from "../../validateSlug";
import { ingressBlock } from "../../rich-text/block-content-ingress";

export function documentInformation(prefix) {
  return [
    {
      title: "Dokument tittel (For søk og visning i Sanity)",
      description: "Eks Guide: <tekst> eller Prinsipp: <tekst>",
      name: "title",
      type: "string",
      group: "settings",
      validation: (Rule) =>
        Rule.required().error("Siden må ha en enkel forklarende tittel"),
    },
    {
      title: "Sidetittel",
      name: "heading",
      type: "string",
      group: "innhold",
      description:
        "Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.",
      validation: (Rule) =>
        Rule.required().error("Siden må ha en kort heading (<h1>)"),
    },
    {
      title: "url",
      name: "slug",
      type: "slug",
      description: "Strukturen bestemmes ikke av URL-en",
      validation: (Rule) => validateSlug(Rule, prefix, 3),
      group: "settings",
      options: {
        isUnique: isSlugUnique,
        source: "heading",
        slugify: (input) =>
          `${prefix}${input}`.toLowerCase().replace(/\s+/g, "-").slice(0, 70),
      },
    },
    {
      title: "Tags",
      description:
        "Tagger siden slik at vi i fremtiden kan forbedre søk og visning.",
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) =>
        Rule.required().error("Siden må være koblet til minst en av taggene"),
      options: {
        list: [
          { value: "core", title: "Core" },
          { value: "nav", title: "Nav.no" },
          { value: "internal", title: "Intern" },
        ],
      },
      group: "metadata",
      initialValue: ["core"],
    },
    {
      title: "Status",
      name: "status",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "published",
      group: "metadata",
      options: {
        list: [
          {
            value: "published",
            title: "Publisert (default)",
          },
          { value: "beta", title: "Beta" },
          { value: "wip", title: "Under arbeid" },
          { value: "legacy", title: "Utdatert / deprecated" },
        ],
        layout: "radio",
      },
    },
    {
      title: "Ingress (valgfritt)",
      name: "ingress",
      type: "array",
      group: "innhold",
      of: [ingressBlock],
    },
  ];
}
