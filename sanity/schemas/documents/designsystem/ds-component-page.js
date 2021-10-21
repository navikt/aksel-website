import { documentMetadata } from "../templates/document-metadata-template";
import { documentInformation } from "../templates/document-template";
import { defaultPreview } from "../templates/document-preview-template";

const prefix = "designsystem/side/";

export default {
  title: "Komponentside",
  name: "ds_component_page",
  type: "document",
  //__experimental_actions: [, /* "create" */ "update", /*'delete',*/ "publish"],
  ...defaultPreview(),
  fields: [
    documentMetadata("article"),
    ...documentInformation(prefix),
    {
      name: "usage",
      type: "blockContent",
      title: "Bruk-tab",
    },
    {
      name: "design",
      type: "blockContent",
      title: "Design-tab",
    },
    {
      name: "development",
      type: "blockContent",
      title: "Utvikling-tab",
    },
    {
      name: "accessibility",
      type: "blockContent",
      title: "Tilgjengelighet-tab",
    },
    {
      title: "Pakkenavn",
      description: "Kobler komponenten til en eller flere pakker",
      name: "linked_packages",
      type: "array",
      of: [{ type: "reference", to: [{ type: "ds_package" }] }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      title: "Npm-pakke lenke (optional)",
      name: "npm_link",
      type: "url",
    },
    {
      title: "Github-kode lenke (optional)",
      name: "github_link",
      type: "url",
    },
    {
      title: "Figma lenke (optional)",
      name: "figma_link",
      type: "url",
    },
  ],
};
