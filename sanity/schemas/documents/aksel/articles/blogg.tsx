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

const prefix = "blogg/";

export default {
  title: "Blogg",
  name: "aksel_blogg",
  type: "document",
  groups,
  defaultDocPreview,
  fields: [
    editorField,
    titleField,
    sanitySlug(prefix, 2),
    introField,
    innholdField,
    bannerField,
  ],
};
