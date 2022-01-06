import React from "react";
import styled from "styled-components";
import { Detail } from "@navikt/ds-react";

function toPlainText(blocks = []) {
  return blocks
    .filter((block) => !(block._type !== "block" || !block.children))
    .map((block) => {
      return block.children.map((child) => child.text).join("");
    })
    .join("\n");
}

const ScTips = styled.div`
  box-shadow: -3px 0 0 0 #6a6a6a;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ScMuted = styled(Detail)`
  text-transform: uppercase;
  color: var(--navds-semantic-color-text-muted);
`;

export default {
  name: "tips",
  title: "Tips",
  type: "object",
  fields: [
    {
      title: "Innhold",
      name: "body",
      type: "blockContent_simple",
      validation: (Rule) =>
        Rule.required().error("Tips-modul må ha noe innhold"),
    },
  ],
  preview: {
    select: {
      body: "body",
    },
    prepare(selection) {
      return { ...selection };
    },
    component: (selection) => {
      return (
        <ScTips>
          <ScMuted>Tips</ScMuted>
          <div>{toPlainText(selection.value.body)}</div>
        </ScTips>
      );
    },
  },
};
