import React from "react";
import "@navikt/ds-css?raw";
import { Detail, Title, BodyLong, BodyShort, Label } from "@navikt/ds-react";

const TitleRenderer = (props, size, level) => (
  <Title size={size} level={level}>
    {props.children}
  </Title>
);

export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "Block",
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
          title: "Title h2",
          value: "h2",
          blockEditor: {
            render: (props) => TitleRenderer(props, "xl", 2),
          },
        },
        {
          title: "Title h3",
          value: "h3",
          blockEditor: {
            render: (props) => TitleRenderer(props, "l", 3),
          },
        },
        {
          title: "Title h4",
          value: "heading4",
          blockEditor: {
            render: (props) => TitleRenderer(props, "m", 4),
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
          title: "BodyShort",
          value: "bodyshort",
          blockEditor: {
            render: (props) => <BodyShort>{props.children}</BodyShort>,
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
      lists: [{ title: "Bullet", value: "bullet" }],
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
          {
            title: "Keyboard",
            value: "kbd",
            blockEditor: {
              icon: () => <kbd>KBD</kbd>,
              render: (props) => <kbd>{props.children}</kbd>,
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
    // Custom types ( add components here)
    { type: "code_example" },
    { type: "prop_table" },
    { type: "changelog" },
    { type: "uu_interaction" },
  ],
};
