import {
  documentFeedbackMetadata,
  documentMetadata,
  defaultPreview,
  documentSearchMetadata,
  documentInformation,
} from "../../templates";

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