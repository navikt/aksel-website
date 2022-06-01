import {
  defaultDocPreview,
  editorField,
  groups,
  ingressField,
  innholdField,
  sanitySlug,
  titleField,
  UnderArbeidField,
} from "@/lib";

const prefix = "blogg/";

export default {
  title: "Blogg",
  name: "aksel_blogg",
  type: "document",
  groups,
  ...defaultDocPreview,
  fields: [
    editorField,
    titleField,
    sanitySlug(prefix, 2),
    ingressField,
    innholdField,
    UnderArbeidField,
  ],
};
