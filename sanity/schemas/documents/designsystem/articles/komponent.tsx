import {
  defaultDocPreview,
  editorField,
  groups,
  innholdFieldNew,
  migratedField,
  publishedAtField,
  sanitySlug,
  titleField,
  UnderArbeidField,
} from "@/lib";

const prefix = "designsystem/komponenter/";

export default {
  title: "Komponentartikkel",
  name: "komponent_artikkel",
  type: "document",
  groups,
  ...defaultDocPreview,
  fields: [
    publishedAtField,
    editorField,
    titleField,
    UnderArbeidField,
    sanitySlug(prefix, 3),
    {
      name: "intro",
      type: "intro_komponent",
      group: "innhold",
    },
    {
      ...innholdFieldNew,
      type: "riktekst_komponent",
      name: "bruk_tab",
      title: "Bruk",
    },
    {
      ...innholdFieldNew,
      type: "riktekst_komponent",
      name: "kode_tab",
      title: "Kode",
    },
    {
      title: "Koblet kodepakke",
      description: "Kobler komponenten til en pakke",
      name: "linked_package",
      type: "reference",
      group: "lenker",
      to: [{ type: "ds_package" }],
      validation: (Rule) =>
        Rule.required().error("Siden må være koblet til en pakke"),
    },
    {
      title: "Figma lenke (optional)",
      name: "figma_link",
      type: "url",
      group: "lenker",
    },
    migratedField,
  ],
};
