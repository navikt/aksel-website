import {
  Download,
  FileContent,
  Hamburger,
  Helmet,
  Home,
  LightBulb,
  NewTab,
  Ruler,
  Scale,
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

const prefix = "designsystem/components/";

export default {
  title: "Komponentartikkel BETA",
  name: "komponent_artikkel",
  type: "document",
  groups: [...groups],
  ...defaultPreview(),
  fields: [
    {
      title: "Bidragsytere",
      description: "Legg til de som har bidratt med denne siden!",
      name: "contributors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "editor" }] }],
      group: "settings",
    },
    ...documentInformation(prefix).filter((x) => x?.name !== "ingress"),
    {
      name: "content_bruk",
      type: "array",
      title: "Bruk",
      group: "innhold",
      validation: (Rule) =>
        Rule.required().error("Siden må ha noe innhold for bruk/design-tab"),
      of: [
        {
          name: "generisk_seksjon",
          type: "generisk_seksjon",
          icon: () => <FileContent />,
        },
        {
          name: "intro_komponent",
          type: "intro_komponent_seksjon",
          icon: () => <Home />,
        },
        {
          name: "live_demo",
          type: "live_demo_seksjon",
          icon: () => <Helmet />,
        },
        {
          name: "uu_seksjon",
          type: "uu_seksjon",
          icon: () => <SignLanguageTwoHands />,
        },
        {
          name: "anatomi",
          type: "anatomi_seksjon",
          icon: () => <Ruler />,
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
      group: "innhold",
      validation: (Rule) =>
        Rule.required().error("Siden må ha noe innhold for kode-tab"),
      of: [
        {
          name: "Seksjon med h2",
          type: "generisk_seksjon",
          icon: () => <span>H2</span>,
        },
        {
          type: "installasjon_seksjon",
          title: "Installasjon",
          icon: () => <Download />,
        },
        {
          type: "props_seksjon",
          title: "Props",
          icon: () => <Scale />,
        },
        { type: "tips", title: "Tips", icon: () => <LightBulb /> },
        {
          type: "relatert_innhold",
          title: "Relatert innhold",
          icon: () => <NewTab />,
        },
      ],
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
  ],
};
