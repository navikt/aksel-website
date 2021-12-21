/* import { documentMetadata } from "../templates/document-metadata-template";
import { documentInformation } from "../templates/document-template";
import { defaultPreview } from "../templates/document-preview-template";

const prefix = "designsystem"; */

export default {
  title: "Forside",
  name: "vk_frontpage",
  type: "document",
  fields: [
    {
      name: "cards",
      type: "array",
      title: "Cards",
      of: [
        {
          title: "Card",
          name: "card",
          type: "object",
          fields: [
            {
              title: "Kategori",
              name: "category_ref",
              type: "reference",
              to: [{ type: "main_categories" }],
              validation: (Rule) =>
                Rule.required().error("Card må ha en hovedkategori"),
            },
            {
              title: "Lenke url",
              name: "link",
              type: "url",
              validation: (Rule) =>
                Rule.required().error("Card må ha en lenke url"),
            },
            {
              title: "Side under design.nav.no",
              name: "internal",
              type: "boolean",
              initialValue: true,
            },
            {
              title: "Tittel",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Card må ha en Tittel"),
            },
            {
              title: "Innhold",
              name: "content",
              type: "string",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
};
