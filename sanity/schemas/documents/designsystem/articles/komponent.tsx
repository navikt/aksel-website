import {
  defaultDocPreview,
  editorField,
  groups,
  innholdFieldNew,
  publishedAtField,
  sanitySlug,
  titleField,
  UnderArbeidField,
} from "@/lib";
import {
  Download,
  FileContent,
  Helmet,
  Home,
  LightBulb,
  NewTab,
  Ruler,
  Scale,
  SignLanguageTwoHands,
} from "@navikt/ds-icons";
import React from "react";

const prefix = "designsystem/komponenter/";

export default {
  title: "Komponentartikkel",
  name: "komponent_artikkel",
  type: "document",
  groups,
  ...defaultDocPreview,
  fields: [
    publishedAtField,
    editorField,
    titleField,
    UnderArbeidField,
    sanitySlug(prefix, 3),
    {
      name: "intro",
      type: "intro_komponent",
      group: "innhold",
    },
    {
      ...innholdFieldNew,
      type: "riktekst_komponent",
      name: "bruk_tab",
      title: "Bruk",
    },
    {
      ...innholdFieldNew,
      type: "riktekst_komponent",
      name: "kode_tab",
      title: "Kode",
    },
    {
      name: "content_bruk",
      type: "array",
      title: "Bruk",
      group: "innhold",
      of: [
        {
          name: "generisk_seksjon",
          type: "generisk_seksjon",
          icon: () => <FileContent />,
        },
        {
          name: "intro_komponent",
          type: "intro_komponent",
          icon: () => <Home />,
        },
        {
          name: "live_demo",
          type: "live_demo",
          icon: () => <Helmet />,
        },
        {
          name: "uu_seksjon",
          type: "uu_seksjon",
          icon: () => <SignLanguageTwoHands />,
        },
        {
          name: "anatomi",
          type: "anatomi",
          icon: () => <Ruler />,
        },
        { type: "tips", title: "Tips/Feedback", icon: () => <LightBulb /> },
        {
          type: "relatert_innhold",
          title: "Relatert innhold",
          icon: () => <NewTab />,
        },
      ],
      validation: (Rule) =>
        Rule.custom((v) => {
          const missing = [];
          const bricks = [
            /* { title: "Intro", type: "intro_komponent" }, */
            /* { title: "Anatomi", type: "anatomi" }, */
            /* { title: "Tilgjengelighet", type: "uu_seksjon" }, */
            { title: "Live demo", type: "live_demo" },
          ];

          bricks.forEach((x) => {
            if (!v.some((z) => z._type === x.type)) {
              missing.push(x);
            }
          });
          if (missing.length !== 0) {
            return `Mangler disse elementene: ${missing
              .map((x) => x.title)
              .join(", ")}`;
          }
          return true;
        }).error(),
    },
    {
      name: "content_kode",
      type: "array",
      title: "Kode",
      group: "innhold",
      validation: (Rule) =>
        Rule.custom((v) => {
          const missing = [];
          const bricks = [
            { title: "Installasjon", type: "installasjon_seksjon" },
            { title: "Props", type: "props_seksjon" },
          ];

          bricks.forEach((x) => {
            if (!v.some((z) => z._type === x.type)) {
              missing.push(x);
            }
          });
          if (missing.length !== 0) {
            return `Mangler disse elementene: ${missing
              .map((x) => x.title)
              .join(", ")}`;
          }
          return true;
        }).error(),
      of: [
        {
          name: "generisk_seksjon",
          type: "generisk_seksjon",
          icon: () => <FileContent />,
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
        { type: "tips", title: "Tips/Feedback", icon: () => <LightBulb /> },
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
  ],
};
