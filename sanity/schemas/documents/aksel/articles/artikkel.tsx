import {
  bannerField,
  defaultDocPreview,
  editorField,
  groups,
  innholdField,
  introField,
  sanitySlug,
  titleField,
} from "@/lib";

const prefix = "artikkel/";

export default {
  title: "Aksel Artikkel",
  name: "aksel_artikkel",
  type: "document",
  groups,
  ...defaultDocPreview,
  fields: [
    editorField,
    titleField,
    sanitySlug(prefix, 2),
    {
      title: "Tema",
      description: "Legg til de viktigeste temaene",
      name: "tema",
      type: "array",
      of: [{ type: "reference", to: [{ type: "aksel_tema" }] }],
      group: "innhold",
    },
    introField,
    innholdField,
    bannerField,
  ],
};
