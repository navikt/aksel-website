import { documentMetadata } from "../templates/document-metadata-template";
import { documentInformation } from "../templates/document-template";
import { defaultPreview } from "../templates/document-preview-template";
import { documentSearchMetadata } from "../templates/document-search-template";
import { documentFeedbackMetadata } from "../templates/document-feedback-template";

const prefix = "designsystem/side/";

export default {
  title: "Artikkel",
  name: "ds_article_page",
  type: "document",
  ...defaultPreview(),
  fields: [
    documentMetadata("article"),
    ...documentInformation(prefix),
    {
      name: "body",
      type: "blockContent",
      title: "Sideinnhold",
      validation: (Rule) =>
        Rule.required().error("Må legge til noe innhold på siden"),
    },
    documentSearchMetadata,
    documentFeedbackMetadata,
  ],
};
