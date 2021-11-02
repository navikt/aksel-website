import React from "react";
import { Ingress } from "@navikt/ds-react";
import { ExternalLink } from "@navikt/ds-icons";
import { allDocumentTypes } from "../../../config";

export const ingressBlock = {
  title: "Block",
  type: "block",
  styles: [
    {
      title: "Ingress",
      value: "normal",
      blockEditor: {
        render: (props) => <Ingress>{props.children}</Ingress>,
      },
    },
  ],
  lists: [],
  // Marks let you mark up inline text in the block editor.
  marks: {
    // Decorators usually describe a single property – e.g. a typographic
    // preference or highlighting by editors.
    decorators: [
      { title: "Strong", value: "strong" },
      { title: "Emphasis", value: "em" },
      {
        title: "Code",
        value: "code",
        blockEditor: {
          render: (props) => (
            <code style={{ color: "#BA3A26" }}>{props.children}</code>
          ),
        },
      },
    ],
    // Annotations can be any object structure – e.g. a link or a footnote.
    annotations: [
      {
        title: "Link til side i sanity",
        name: "internalLink",
        type: "object",
        blockEditor: {
          icon: () => <ExternalLink />,
        },
        fields: [
          {
            title: "Reference",
            name: "reference",
            type: "reference",
            to: [
              ...allDocumentTypes.map((doc) => ({
                type: doc,
              })),
            ],
          },
        ],
      },
      {
        title: "External link",
        name: "link",
        type: "object",
        fields: [
          {
            title: "URL",
            name: "href",
            type: "url",
          },
          {
            title: "Open in new tab",
            name: "blank",
            type: "boolean",
            initialValue: true,
          },
        ],
      },
    ],
  },
};
