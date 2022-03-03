import { validateSlug, isSlugUnique } from "../../validateSlug";

export function documentInformation(prefix, depth?: number) {
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
      validation: (Rule) => validateSlug(Rule, prefix, depth ?? 3),
      group: "settings",
      options: {
        isUnique: isSlugUnique,
        source: "heading",
        slugify: (input) =>
          `${prefix}${input}`
            .toLowerCase()
            .trim()
            .slice(0, 70)
            .trim()
            .replace(/\s+/g, "-"),
      },
    },
  ];
}
