import { documentMetadata } from "../templates/document-metadata-template";
import { documentInformation } from "../templates/document-template";
import { defaultPreview } from "../templates/document-preview-template";
import { situations } from "./situations";

const prefix = "god-praksis/side/";

export default {
  title: "Artikkelside",
  name: "gp_article_page",
  type: "document",
  ...defaultPreview(),
  fields: [
    documentMetadata("article"),
    ...documentInformation(prefix),
    {
      title: "Situasjoner og faser",
      name: "categories",
      type: "object",
      fields: [
        {
          title: "Situasjon",
          name: "situation",
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: [
              ...situations.map((x) => ({ title: x.name, value: x.name })),
            ],
          },
        },
        ...situations.map((x) => ({
          title: `Faser for ${x.name}`,
          name: `${x.name}_phase`,
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: [
              ...x.phases.map((y) => ({
                title: `Fase ${y.phase}: ${y.name}`,
                value: y.name,
              })),
            ],
          },
          hidden: ({ parent }) =>
            !parent?.situation || parent?.situation.indexOf(x.name) === -1,
        })),
      ],
    },
    {
      name: "body",
      type: "gp_blockContent",
      title: "Innhold",
      validation: (Rule) => Rule.required(),
    },
  ],
};
