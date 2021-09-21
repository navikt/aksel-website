import { documentMetadata } from "../templates/document-metadata-template";
import { documentInformation } from "../templates/document-template";

const prefix = "god-praksis/side/";

export default {
  title: "Artikkelside",
  name: "gp_article_page",
  type: "document",
  fields: [
    documentMetadata("article"),
    ...documentInformation(prefix),
    {
      name: "body",
      type: "blockContent",
      title: "Innhold",
      validation: (Rule) => Rule.required(),
    },
  ],
};
