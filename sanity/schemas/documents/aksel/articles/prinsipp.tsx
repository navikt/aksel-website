import {
  bannerField,
  defaultDocPreview,
  editorField,
  groups,
  innholdField,
  introField,
  isSlugUnique,
  prinsipper,
  titleField,
} from "@/lib";

const prefix = "prinsipp/";

export default {
  title: "Aksel Prinsipp",
  name: "aksel_prinsipp",
  type: "document",
  groups,
  defaultDocPreview,
  fields: [
    editorField,
    titleField,
    {
      title: "url",
      name: "slug",
      type: "slug",
      validation: (Rule) =>
        Rule.required().custom((slug, { document }) => {
          if (!slug || !slug.current)
            return `Må ha noe innhold. Har du husket å velget et prinsipp først?`;
          const maxLength = document?.prinsipp?.hovedside ? 2 : 3;
          const newPrefix = `${prefix}${document?.prinsipp?.prinsippvalg}`;

          if (!document?.prinsipp?.prinsippvalg)
            return `Siden må ha valgt prinsipp for å sette opp url`;
          if (document?.prinsipp?.hovedside && slug.current !== newPrefix) {
            return `Siden er en hovedside for prinsippet og må derfor være på url ${newPrefix}`;
          }
          if (
            !document?.prinsipp?.hovedside &&
            !slug.current.startsWith(newPrefix)
          ) {
            return `Slug må starte med: ${newPrefix}`;
          }

          if (
            (slug.current.split("/") || []).filter((x) => !!x).length !==
            maxLength
          ) {
            return `Siden må være på ${maxLength} nivå`;
          }
          return true;
        }),
      group: "settings",
      options: {
        isUnique: isSlugUnique,
        source: ({ prinsipp = null, heading = null }) => ({
          prinsipp,
          heading,
        }),
        slugify: ({ prinsipp, heading }) => {
          if (!prinsipp || !heading) return "";
          const rest = prinsipp.hovedside ? "" : `/${heading}`;
          return `${prefix}${prinsipp.prinsippvalg}${rest}`
            .toLowerCase()
            .trim()
            .slice(0, 80)
            .trim()
            .replace(/\s+/g, "-")
            .replace("æ", "a")
            .replace("ø", "o")
            .replace("å", "a");
        },
      },
    },
    {
      title: "Prinsipp",
      description: "Velg prinsippet siden omhandler",
      name: "prinsipp",
      group: "innhold",
      type: "object",
      fields: [
        {
          title: "Velg prinsipp",
          name: "prinsippvalg",
          type: "string",
          options: {
            list: prinsipper,
            layout: "radio",
          },
          validation: (Rule) =>
            Rule.required().error("Prinsippsider må ha valgt et prinsipp"),
        },
        {
          title: "Er denne siden hovedsiden til Prinsippet?",
          name: "hovedside",
          type: "boolean",
          initialValue: false,
          validation: (Rule) =>
            Rule.required().error("Prinsippsider må ha valgt et prinsipp"),
        },
      ],
    },
    introField,
    innholdField,
    bannerField,
  ],
};
