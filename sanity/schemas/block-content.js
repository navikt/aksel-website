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
  Braille,
  Laptop,
  List,
} from "@navikt/ds-icons";

import { KBD } from "@sanity/ui";

const TitleRenderer = (props, size, level) => (
  <Heading size={size} level={level}>
    {props.children}
  </Heading>
);

export const styles = [
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
];

export const block = {
  title: "Block",
  type: "block",
  styles: [...styles],
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
          icon: () => <KBD style={{ verticalAlign: "top" }}>Ctrl</KBD>,
          render: (props) => (
            <KBD
              padding={[1, 1, 2]}
              size={[1, 1, 2]}
              style={{ verticalAlign: "top" }}
            >
              {props.children}
            </KBD>
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
};

export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      ...block,
      styles: [
        ...block.styles,
        {
          title: "Title h2",
          value: "h2",
          blockEditor: {
            render: (props) => TitleRenderer(props, "xlarge", "2"),
          },
        },
        {
          title: "Title h3",
          value: "h3",
          blockEditor: {
            render: (props) => TitleRenderer(props, "large", "3"),
          },
        },
        {
          title: "Title h4",
          value: "heading4",
          blockEditor: {
            render: (props) => TitleRenderer(props, "medium", "4"),
          },
        },
      ],
    },
    // Custom types (add components here)
    {
      type: "picture",
    },
    {
      type: "alert",
      icon: () => <Warning />,
    },
    {
      type: "figma_embed",
      /* icon: () => <Warning />, */
    },
    { type: "code_snippet", icon: () => <span>{`< />`}</span> },
    { type: "code_example_ref", icon: () => <Laptop /> },
    { type: "prop_table", icon: () => <List /> },
    { type: "uu_interaction", icon: () => <Braille /> },
    {
      type: "do_dont",
      icon: () => <SuccessStroke />,
    },
  ],
};
