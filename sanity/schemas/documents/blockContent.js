import React from "react";
import "@navikt/ds-css?raw";
import { Title } from "@navikt/ds-react";

const TitleRenderer = (props) => (
  <Title size="l" level={2} spacing>
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
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        {
          title: "H2",
          value: "h2",
          blockEditor: {
            render: TitleRenderer,
          },
        },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "BodyLong", value: "bodylong" },
        { title: "BodyShort", value: "bodyshort" },
        { title: "DetailBold", value: "detailbold" },
        { title: "Detail", value: "detail" },
        { title: "Label", value: "label" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      // Marks let you mark up inline text in the block editor.
      /* marks: {
              // Decorators usually describe a single property – e.g. a typographic
              // preference or highlighting by editors.
              decorators: [
                  {title: "Strong", value: "strong"},
                  {title: "Emphasis", value: "em"},
              ],
              // Annotations can be any object structure – e.g. a link or a footnote.
              annotations: [
                  {
                      title: "Internal link",
                      name: "internalLink",
                      type: "object",
                      blockEditor: {
                          icon: FaPaperclip,
                      },
                      fields: [
                          {
                              title: "Reference",
                              name: "reference",
                              type: "reference",
                              to: [
                                  {
                                      type: "article",
                                  },
                                  {
                                      type: "otherPossibilities",
                                  },
                                  {type: "applicationPage"},
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
                  {
                      type: "object",
                      name: "interpolate",
                      title: "Interpolate",
                      fields: [
                          {
                              name: "prop",
                              type: "string",
                              description:
                                  "En templateverdi som blir byttet ut med en ekte verdi i appen, eks: kommuneNavn = 'Oslo'",
                              options: {
                                  list: Object.keys(properties).map((it) => ({
                                      title: it,
                                      value: it,
                                  })),
                              },
                          },
                      ],
                  },
              ],
          }, */
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    /* {
          type: "image",
          options: {hotspot: true},
      },
      {type: "customBlockComponent"},
      {type: "expandedPanel"},
      {type: "veilederPanel"},
      {type: "vimeo"},
      {type: "embeddedVideo"}, */
    { type: "accordion" },
  ],
};
