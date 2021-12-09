import React from "react";
import { ExternalLink } from "@navikt/ds-icons";
import * as Icons from "@navikt/ds-icons";
import * as Tokens from "@navikt/ds-tokens/dist/tokens";

import styled from "styled-components";

const ScLine = styled.span`
  text-decoration: line-through;
`;

const DisplayIcon = (props) => {
  const Ic = Icons?.[props?.name];
  return Ic ? (
    <span style={{ color: Tokens?.[props?.color] ?? "currentcolor" }}>
      <Ic /> <ScLine>{props.children}</ScLine>
    </span>
  ) : (
    <ScLine>{props.children}</ScLine>
  );
};

export default {
  title: "Ikon",
  name: "ds_icon",
  type: "object",
  blockEditor: {
    icon: () => <ExternalLink />,
    render: DisplayIcon,
  },
  fields: [
    {
      title: "Ikon",
      description: "Bruk fargesøket på nettsiden for å finne riktig ikon",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required().error("Må velge ikon-navn"),
      options: {
        list: [
          ...Object.keys(Icons).map((icon) => ({ title: icon, value: icon })),
        ],
      },
    },
    {
      title: "Farge",
      description: "Defaulter til tekstfarge",
      name: "color",
      type: "string",
      options: {
        list: [
          ...Object.keys(Tokens)
            .filter(
              (token) =>
                token.startsWith("NavdsSemantic") && token.includes("Icon")
            )
            .map((color) => ({
              title: color.replace("NavdsSemanticColor", ""),
              value: color,
            })),
        ],
      },
    },
  ],
};
