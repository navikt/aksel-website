import { documentMetadata } from "../templates/document-metadata-template";
import { documentInformation } from "../templates/document-template";
import { defaultPreview } from "../templates/document-preview-template";
import { situations } from "./situations";
import CustomCategories from "../../../components/gp-categories";
import CustomDisplay from "../../../components/metadata-display";
const prefix = "god-praksis/side/";

export default {
  title: "Artikkelside",
  name: "gp_article_page",
  type: "document",
  ...defaultPreview(),
  fields: [
    /* {
      title: "Display",
      name: "datadisplay",
      type: "string",
      inputComponent: CustomDisplay,
    }, */
    /* {
      title: "Categories",
      name: "test_Categories",
      type: "array",
      of: [
        {
          type: "object",
          name: "situation",
          fields: [
            {
              title: "Situasjonsnavn",
              name: "name",
              type: "string",
            },
            {
              title: "Phase",
              name: "phase",
              type: "string",
            },
          ],
        },
      ],
      inputComponent: CustomCategories,
    }, */
    documentMetadata("article"),
    ...documentInformation(prefix).filter((x) => x.name !== "tags"),
    {
      name: "body",
      type: "gp_blockContent",
      title: "Innhold",
      validation: (Rule) => Rule.required(),
    },
  ],
};
