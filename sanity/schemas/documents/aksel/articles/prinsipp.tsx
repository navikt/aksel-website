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

const prefix = "artikkel/";

export default {
  title: "Aksel Prinsipp",
  name: "aksel_prinsipp",
  type: "document",
  groups,
  ...defaultPreview(),
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
    documentFeedbackMetadata,
  ],
};
