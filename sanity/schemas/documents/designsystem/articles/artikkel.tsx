import {
  defaultDocPreview,
  editorField,
  groups,
  hidePageFeedback,
  innholdFieldNew,
  innholdFieldNewNested,
  migratedField,
  publishedAtField,
  sanitySlug,
  titleField,
  UnderArbeidField,
} from "@/lib";

const prefix = "designsystem/side/";

export default {
  title: "Artikkel",
  name: "ds_artikkel",
  type: "document",
  groups,
  ...defaultDocPreview,
  fields: [
    migratedField,
    publishedAtField,
    editorField,
    titleField,
    UnderArbeidField,
    sanitySlug(prefix, 3),
    {
      type: "boolean",
      name: "artikkel_type",
      title: "Bruk Tabs",
      group: "innhold",
      initialValue: false,
    },
    {
      ...innholdFieldNew,
      type: "riktekst_ds_artikkel",
      hidden: ({ document }) => !!document?.artikkel_type,
    },
    {
      name: "content_tabs",
      title: "Innhold i Tabs",
      type: "array",
      group: "innhold",
      hidden: ({ document }) => !document?.artikkel_type,
      of: [
        {
          name: "tab",
          title: "Tab",
          type: "object",
          fields: [
            {
              title: "Tittel",
              description: "Innhold vil da legges under url/tab-tittel",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Tabben må ha en enkel tittel"),
            },
            innholdFieldNewNested(),
          ],
        },
      ],
    },
    hidePageFeedback,
  ],
};
