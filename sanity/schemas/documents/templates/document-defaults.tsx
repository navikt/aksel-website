import { sanitySlug } from "@/lib";

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
    sanitySlug(prefix, depth ?? 3),
  ];
}
