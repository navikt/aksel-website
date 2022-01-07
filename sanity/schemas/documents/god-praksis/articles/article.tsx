import GodPraksisForklaring from "../../../../components/gp-forklaring";
import {
  documentInformation,
  defaultPreview,
  documentMetadata,
  documentFeedbackMetadata,
  documentSearchMetadata,
} from "../../templates";

const prefix = "god-praksis/side/";

export default {
  title: "Artikkelside",
  name: "gp_article_page",
  type: "document",
  ...defaultPreview(),
  fields: [
    {
      name: "visningstekst",
      type: "string",
      title: "Innhold",
      inputComponent: GodPraksisForklaring,
    },
    {
      name: "notes",
      description:
        "Redaktør-notater. Noe som ble igjen på TODO lista? Legg det til her!",
      type: "text",
      title: "Notater",
      rows: 4,
    },
    documentMetadata("article"),
    ...documentInformation(prefix).filter((x) => x.name !== "tags"),
    {
      name: "body",
      type: "gp_blockContent",
      title: "Sideinnhold",
      validation: (Rule) => Rule.required().error("Siden må ha noe innhold"),
    },
    /* documentSearchMetadata, */
    documentFeedbackMetadata,
  ],
};
