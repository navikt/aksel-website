import { validateSlug, isSlugUnique } from "../../validateSlug";
import { ingressBlock } from "../../rich-text/block-content-ingress";

export function documentInformation(prefix) {
  return [
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
