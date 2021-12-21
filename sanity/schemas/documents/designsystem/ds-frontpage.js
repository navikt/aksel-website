/* import { documentMetadata } from "../templates/document-metadata-template";
import { documentInformation } from "../templates/document-template";
import { defaultPreview } from "../templates/document-preview-template";

const prefix = "designsystem"; */

export default {
  title: "Forside",
  name: "ds_frontpage",
  type: "document",
  fields: [
    {
      name: "body",
      type: "blockContent_simple",
      title: "Innhold",
      validation: (Rule) => Rule.required(),
    },
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
              title: "Lenke",
              name: "link_ref",
              type: "reference",
              to: [
                { type: "ds_component_page" },
                { type: "ds_article_page" },
                { type: "ds_tabbed_article_page" },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              title: "Tittel",
              name: "title",
              type: "string",
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
