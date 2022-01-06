import {
  documentFeedbackMetadata,
  documentMetadata,
  defaultPreview,
  documentSearchMetadata,
  documentInformation,
} from "../../templates";

const prefix = "designsystem/side/";

export default {
  title: "Komponentartikkel",
  name: "ds_component_page",
  type: "document",
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
      title: "Relaterte pakker",
      description: "Kobler komponenten til en eller flere pakker",
      name: "linked_packages",
      type: "array",
      of: [{ type: "reference", to: [{ type: "ds_package" }] }],
      validation: (Rule) =>
        Rule.required().min(1).error("Siden må være koblet til minst en pakke"),
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
    documentSearchMetadata,
    documentFeedbackMetadata,
  ],
};