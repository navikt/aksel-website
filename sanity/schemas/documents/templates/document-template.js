import { validateSlug, isSlugUnique } from "../../validateSlug";
import { ingressBlock } from "./block-content-ingress";

export function documentInformation(prefix) {
  return [
    {
      title: "Dokument tittel (For søk og visning internt i Sanity)",
      description:
        "Bruke en beskrivende tittel slik at det er lett å finne siden i CMS et.",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Sidetittel",
      name: "heading",
      type: "string",
      description:
        "Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "url",
      name: "slug",
      type: "slug",
      description: "Note: Strukturen bestemmes ikke av URL-en",
      validation: (Rule) => validateSlug(Rule, prefix, 3),
      options: {
        isUnique: isSlugUnique,
        source: "heading",
        slugify: (input) =>
          `${prefix}${input}`.toLowerCase().replace(/\s+/g, "-").slice(0, 50),
      },
    },
    {
      title: "Ingress (valgfritt)",
      name: "ingress",
      type: "array",
      of: [ingressBlock],
    },
    {
      title: "Tags",
      description:
        "Tagger siden slik at vi i fremtiden kan forbedre søk og visning.",
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
      initialValue: ["published"],
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
