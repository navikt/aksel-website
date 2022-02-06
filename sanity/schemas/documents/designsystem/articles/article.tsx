import {
  documentFeedbackMetadata,
  documentMetadata,
  defaultPreview,
  documentInformation,
  groups,
} from "../../templates";

const prefix = "designsystem/side/";

export default {
  title: "Artikkel",
  name: "ds_article_page",
  type: "document",
  ...defaultPreview(),
  groups: [...groups],
  fields: [
    ...documentMetadata(),
    ...documentInformation(prefix),
    {
      type: "boolean",
      name: "article_type",
      title: "Tabs",
      initialValue: false,
    },
    {
      name: "body",
      type: "blockContent",
      title: "Sideinnhold",
      group: "innhold",
      validation: (Rule) =>
        Rule.required().error("Må legge til noe innhold på siden"),
    },
    documentFeedbackMetadata,
  ],
};
