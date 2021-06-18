import React from "react";
import "@navikt/ds-css?raw";
import { Detail, Title, BodyLong, BodyShort, Label } from "@navikt/ds-react";

export default {
  title: "Enkelt tekst innhold",
  name: "simple_block_content",
  type: "array",
  of: [
    {
      title: "Tekstblokk",
      type: "block",
      styles: [
        {
          title: "Normal",
          value: "normal",
          blockEditor: {
            render: (props) => <BodyLong>{props.children}</BodyLong>,
          },
        },
        {
          title: "BodyLong",
          value: "bodylong",
          blockEditor: {
            render: (props) => <BodyLong>{props.children}</BodyLong>,
          },
        },
        {
          title: "DetailBold",
          value: "detailbold",
          blockEditor: {
            render: (props) => <Detail>{props.children}</Detail>,
          },
        },
        {
          title: "Detail",
          value: "detail",
          blockEditor: {
            render: (props) => <Detail size="s">{props.children}</Detail>,
          },
        },
        {
          title: "Label",
          value: "label",
          blockEditor: {
            render: (props) => <Label spacing>{props.children}</Label>,
          },
        },
      ],
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
            title: "Internal link",
            name: "internalLink",
            type: "object",
            blockEditor: {
              icon: () => "ref",
            },
            fields: [
              {
                title: "Reference",
                name: "reference",
                type: "reference",
                to: [
                  {
                    type: "ds_page",
                  },
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
              },
            ],
          },
        ],
      },
    },
  ],
};
