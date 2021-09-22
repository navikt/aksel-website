/* import { documentMetadata } from "../templates/document-metadata-template";
import { documentInformation } from "../templates/document-template";
import { defaultPreview } from "../templates/document-preview-template";

const prefix = "designsystem"; */

export default {
  title: "Forside",
  name: "vk_frontpage",
  type: "document",
  fields: [
    {
      name: "content",
      type: "string",
      title: "Innhold",
      validation: (Rule) => Rule.required(),
    },
  ],
};
