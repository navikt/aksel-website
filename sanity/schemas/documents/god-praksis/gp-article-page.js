import { documentMetadata } from "../templates/document-metadata-template";
import { documentInformation } from "../templates/document-template";
import { defaultPreview } from "../templates/document-preview-template";
/* import { situations } from "./situations";
import CustomDisplay from "../../../components/metadata-display"; */
import GodPraksisForklaring from "../../../components/gp-forklaring";
import { documentSearchMetadata } from "../templates/document-search-template";
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
    {
      name: "visningstekst",
      type: "string",
      title: "Innhold",
      inputComponent: GodPraksisForklaring,
    },
    {
      name: "notes",
      description:
        "Vises bare her internt i Sanity. Kan brukes for å holde styringen på hva som er status etc",
      type: "text",
      title: "Interne notater",
      rows: 4,
    },
    documentMetadata("article"),
    documentSearchMetadata,
    ...documentInformation(prefix).filter((x) => x.name !== "tags"),
    {
      name: "body",
      type: "gp_blockContent",
      title: "Innhold",
      validation: (Rule) => Rule.required().error("Siden må ha noe innhold"),
    },
  ],
};
