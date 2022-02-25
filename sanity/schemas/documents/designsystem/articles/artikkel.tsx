import { FileContent, LightBulb, NewTab, Star } from "@navikt/ds-icons";
import React from "react";
import {
  defaultPreview,
  documentFeedbackMetadata,
  documentInformation,
  groups,
} from "../../templates";

const prefix = "designsystem/side/";

export default {
  title: "Artikkel BETA",
  name: "ds_artikkel",
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
      type: "boolean",
      name: "artikkel_type",
      title: "Bruk Tabs",
      group: "innhold",
      initialValue: false,
    },
    {
      name: "innhold",
      type: "array",
      title: "Innhold",
      group: "innhold",
      hidden: ({ document }) => !!document?.artikkel_type,
      of: [
        {
          name: "generisk_seksjon",
          type: "generisk_seksjon",
          icon: () => <FileContent />,
        },
        { type: "tips", title: "Tips", icon: () => <LightBulb /> },
        {
          type: "relatert_innhold",
          title: "Relatert innhold",
          icon: () => <NewTab />,
        },
        {
          type: "spesial_seksjon",
          title: "Spesial seksjon",
          icon: () => <Star />,
        },
      ],
    },
    {
      name: "innhold_tabs",
      title: "Innhold i Tabs",
      type: "array",
      group: "innhold",
      hidden: ({ document }) => !document?.artikkel_type,
      of: [
        {
          name: "tab",
          title: "Tab",
          type: "object",
          fields: [
            {
              title: "Tittel",
              description: "Innhold vil da legges under url/tab-tittel",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Tabben må ha en enkel tittel"),
            },
            {
              name: "innhold",
              type: "array",
              title: "Innhold",
              validation: (Rule) =>
                Rule.required().error("Tabben må ha noe innhold"),
              of: [
                {
                  name: "generisk_seksjon",
                  type: "generisk_seksjon",
                  icon: () => <FileContent />,
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
        },
      ],
    },

    documentFeedbackMetadata,
  ],
};
