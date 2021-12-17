import { block, TitleRenderer } from "./block-content";
import { Information } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Block Content",
  name: "blockContent_accordion",
  type: "array",
  of: [
    {
      ...block,
      styles: [
        {
          title: "Tittel <h3/>",
          value: "h3",
          blockEditor: {
            render: (props) => TitleRenderer(props, "small", "3"),
          },
        },
        {
          title: "Tittel <h4/>",
          value: "heading4",
          blockEditor: {
            render: (props) => TitleRenderer(props, "xsmall", "4"),
          },
        },
        ...block.styles,
      ],
    },
    {
      type: "tips",
      icon: () => <Information />,
    },
    { type: "code_snippet", icon: () => <span>{`< />`}</span> },
  ],
};
