import { documentMetadata } from "../templates/document-metadata-template";
import { documentInformation } from "../templates/document-template";
import { defaultPreview } from "../templates/document-preview-template";
import { documentSearchMetadata } from "../templates/document-search-template";

const prefix = "designsystem/side/";

export default {
  title: "Artikkelside",
  name: "ds_article_page",
  type: "document",
  ...defaultPreview(),
  fields: [
    documentMetadata("article"),
    documentSearchMetadata,
    ...documentInformation(prefix),
    {
      name: "body",
      type: "blockContent",
      title: "Innhold",
      validation: (Rule) =>
        Rule.required().error("Må legge til noe innhold på siden"),
    },
  ],
};
