import { Accordion as DsAccordion } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";
import { Accordion as AccordionT } from "../../lib/autogen-types";
import { SanityBlockContent } from "../SanityBlockContent";
import { withErrorBoundary } from "../error-boundary";

const ScAccordion = styled(DsAccordion)`
  margin-bottom: 2rem;
`;

const Accordion = ({ node }: { node: AccordionT }): JSX.Element => {
  if (!node || !node.list) {
    return null;
  }

  return (
    <ScAccordion>
      {node.list.map((el) => (
        <DsAccordion.Item key={el._key}>
          <DsAccordion.Header>{el.heading}</DsAccordion.Header>
          <DsAccordion.Content>
            <SanityBlockContent blocks={el.body} />
          </DsAccordion.Content>
        </DsAccordion.Item>
      ))}

      {/* {node.heading && (
        <Heading
          spacing
          size={node.size === "medium" ? "small" : "xsmall"}
          as={node.heading_level}
          id={slug}
        >
          {node.heading}
        </Heading>
      )}
      <SanityBlockContent blocks={node.body} size={node.size} /> */}
    </ScAccordion>
  );
};

export default withErrorBoundary(Accordion, "Accordion");
