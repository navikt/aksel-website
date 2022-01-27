import { Accordion as DsAccordion } from "@navikt/ds-react";
import React from "react";
import { Accordion as AccordionT } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";
import { withErrorBoundary } from "../../ErrorBoundary";

const Accordion = ({ node }: { node: AccordionT }): JSX.Element => {
  if (!node || !node.list) {
    return null;
  }

  return (
    <div className="section--small">
      <DsAccordion>
        {node.list.map((el) => (
          <DsAccordion.Item key={el._key}>
            <DsAccordion.Header>{el.heading}</DsAccordion.Header>
            <DsAccordion.Content>
              <SanityBlockContent blocks={el.body} />
            </DsAccordion.Content>
          </DsAccordion.Item>
        ))}
      </DsAccordion>
    </div>
  );
};

export default withErrorBoundary(Accordion, "Accordion");
