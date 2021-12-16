import { block } from "./block-content";
import { Information } from "@navikt/ds-icons";
import React from "react";

export default {
  title: "Block Content",
  name: "blockContent_accordion",
  type: "array",
  of: [
    block,
    {
      type: "tips",
      icon: () => <Information />,
    },
    { type: "code_snippet", icon: () => <span>{`< />`}</span> },
  ],
};
