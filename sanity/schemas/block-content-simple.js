import React from "react";
import "@navikt/ds-css?raw";
import {
  Detail,
  Heading,
  BodyLong,
  BodyShort,
  Label,
} from "@navikt/ds-react/cjs";
import {
  Warning,
  SuccessStroke,
  BrailleFilled,
  Laptop,
  Link,
  Picture,
} from "@navikt/ds-icons";

const TitleRenderer = (props, size, level) => (
  <Heading size={size} level={level}>
    {props.children}
  </Heading>
);

export default {
  title: "Block Content",
  name: "blockContent_simple",
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
          title: "Detail",
          value: "detail",
          blockEditor: {
            render: (props) => <Detail size="small">{props.children}</Detail>,
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
                    type: "ds_article_page",
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
