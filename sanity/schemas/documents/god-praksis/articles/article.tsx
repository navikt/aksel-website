import GodPraksisForklaring from "../../../../components/gp-forklaring";
import {
  documentInformation,
  defaultPreview,
  documentMetadata,
  documentFeedbackMetadata,
  groups,
} from "../../templates";

const prefix = "god-praksis/side/";

export default {
  title: "Artikkelside",
  name: "gp_article_page",
  type: "document",
  groups: [...groups],
  ...defaultPreview(),
  fields: [
    {
      name: "visningstekst",
      type: "string",
      title: "Innhold",
      inputComponent: GodPraksisForklaring,
    },
    ...documentMetadata(),
    ...documentInformation(prefix),
    {
      name: "body",
      type: "gp_blockContent",
      title: "Sideinnhold",
      group: "innhold",
      validation: (Rule) => Rule.required().error("Siden må ha noe innhold"),
    },
    documentFeedbackMetadata,
  ],
};
