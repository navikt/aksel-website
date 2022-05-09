import {
  bannerField,
  editorField,
  groups,
  innholdField,
  introField,
  sanitySlug,
  titleField,
  toPlainText,
} from "@/lib";
import { FileContent, LightBulb, NewTab } from "@navikt/ds-icons";
import React from "react";
import { defaultPreview, documentFeedbackMetadata } from "../../templates";

const prefix = "blogg/";

export default {
  title: "Blogg",
  name: "aksel_blogg",
  type: "document",
  groups,
  ...defaultPreview(),
  fields: [
    editorField,
    titleField,
    sanitySlug(prefix, 2),
    introField,
    innholdField,
    bannerField,
    documentFeedbackMetadata,
  ],
};
