import { ExternalLink, FileContent, Link } from "@navikt/ds-icons";
import { BodyLong, Heading } from "@navikt/ds-react/cjs";
import { KBD } from "@sanity/ui";
import React from "react";
import styled from "styled-components";
import { allDocumentTypes } from "../../../config";
import IconDecorator from "../../old-template/rich-text/icon-decorator";

export const TitleRenderer = (props, size, level) => (
  <Heading size={size} level={level}>
    {props.children}
  </Heading>
);

export const ScCode = styled.code`
  color: var(--navds-global-color-deepblue-500);
  background-color: var(--navds-global-color-deepblue-50);
  border-radius: 6px;
  font-size: 1rem;
  padding: 2px 0.5rem;
`;

export const styles = [
  {
    title: "Avsnitt",
    value: "normal",
    blockEditor: {
      render: (props) => <BodyLong>{props.children}</BodyLong>,
    },
  },
];

export const block = {
  title: "Block",
  type: "block",
  styles: [...styles],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
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
          render: (props) => <ScCode>{props.children}</ScCode>,
        },
      },
      {
        title: "Keyboard",
        value: "kbd",
        blockEditor: {
          icon: () => <KBD style={{ verticalAlign: "top" }}>kbd</KBD>,
          render: (props) => (
            <KBD padding={[1, 1, 2]} style={{ verticalAlign: "super" }}>
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
          icon: () => <Link />,
        },
        options: {
          modal: {
            type: "dialog",
            width: "medium", // 'small' | 'medium' | 'large' | 'full'
          },
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
        blockEditor: {
          icon: () => <ExternalLink />,
        },
        fields: [
          {
            title: "URL",
            name: "href",
            type: "url",
          },
          {
            title: "Åpne siden i ny tab",
            name: "blank",
            type: "boolean",
            initialValue: true,
          },
        ],
      },
      IconDecorator,
    ],
  },
};

export const headingStyles = [
  ...block.styles,
  {
    title: "Tittel H3",
    value: "h3",
    blockEditor: {
      render: (props) => (
        <Heading as="span" size="xsmall">
          {props.children}
        </Heading>
      ),
    },
  },
  {
    title: "Tittel H4",
    value: "h4",
    blockEditor: {
      render: (props) => (
        <Heading as="span" size="xsmall">
          {props.children}
        </Heading>
      ),
    },
  },
];

export default {
  title: "Riktekst",
  name: "riktekst",
  type: "array",
  of: [
    {
      ...block,
      styles: [...headingStyles],
    },
  ],
  icon: () => <FileContent />,
};
