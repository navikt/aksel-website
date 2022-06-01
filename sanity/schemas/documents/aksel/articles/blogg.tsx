import {
  defaultDocPreview,
  editorField,
  groups,
  ingressField,
  innholdField,
  introField,
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
    introField,
    ingressField,
    innholdField,
    UnderArbeidField,
  ],
};
