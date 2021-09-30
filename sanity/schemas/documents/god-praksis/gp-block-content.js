import React from "react";
import { Warning, SuccessStroke } from "@navikt/ds-icons";
import { styles, TitleRenderer } from "../../block-content";

export default {
  title: "Block Content",
  name: "gp_blockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        ...styles,
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
    },
    {
      type: "picture",
    },
    {
      type: "alert",
      icon: () => <Warning />,
    },
    {
      type: "figma_embed",
    },
    { type: "code_snippet", icon: () => <span>{`< />`}</span> },
    {
      type: "do_dont",
      icon: () => <SuccessStroke />,
    },
  ],
};
