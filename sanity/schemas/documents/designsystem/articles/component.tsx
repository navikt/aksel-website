import {
  documentFeedbackMetadata,
  documentMetadata,
  defaultPreview,
  documentInformation,
  groups,
} from "../../templates";

const prefix = "designsystem/side/";

export default {
  title: "Komponentartikkel",
  name: "ds_component_page",
  type: "document",
  groups: [...groups],
  ...defaultPreview(),
  fields: [
    documentMetadata("article"),
    ...documentInformation(prefix),
    {
      name: "usage",
      type: "blockContent",
      title: "Bruk-tab",
      group: "innhold",
    },
    {
      name: "design",
      type: "blockContent",
      title: "Design-tab",
      group: "innhold",
    },
    {
      name: "development",
      type: "blockContent",
      title: "Utvikling-tab",
      group: "innhold",
    },
    {
      name: "accessibility",
      type: "blockContent",
      title: "Tilgjengelighet-tab",
      group: "innhold",
    },
    {
      title: "Koblet kodepakke",
      description: "Kobler komponenten til en pakke",
      name: "linked_package",
      type: "reference",
      group: "code-connection",
      to: [{ type: "ds_package" }],
      validation: (Rule) =>
        Rule.required().error("Siden må være koblet til en pakke"),
    },
    {
      title: "Figma lenke (optional)",
      name: "figma_link",
      type: "url",
      group: "lenker",
    },
    documentFeedbackMetadata,
  ],
};
