import {
  Hamburger,
  Helmet,
  Home,
  LightBulb,
  NewTab,
  SignLanguageTwoHands,
} from "@navikt/ds-icons";
import React from "react";
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
    ...documentMetadata(),
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
      group: "lenker",
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
    {
      name: "content_bruk",
      type: "array",
      title: "Bruk",
      group: "beta",
      of: [
        {
          name: "generisk_seksjon",
          type: "generisk_seksjon",
        },
        {
          name: "intro_komponent",
          type: "intro_komponent",
        },
        {
          name: "live_demo",
          type: "live_demo",
        },
        {
          name: "uu_seksjon",
          type: "uu_seksjon",
        },
        { type: "tips", title: "Tips", icon: () => <LightBulb /> },
        {
          type: "related_pages",
          title: "Relatert innhold",
          icon: () => <NewTab />,
        },
      ],
    },
    {
      name: "content_kode",
      type: "array",
      title: "Kode",
      group: "beta",
      of: [
        {
          name: "Seksjon med h2",
          type: "generisk_seksjon",
          icon: () => <span>H2</span>,
        },
        { type: "tips", title: "Tips", icon: () => <LightBulb /> },
        {
          type: "relatert_innhold",
          title: "Relatert innhold",
          icon: () => <NewTab />,
        },
      ],
    },
  ],
};
