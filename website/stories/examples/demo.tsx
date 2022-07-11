import { Detail, Heading } from "@navikt/ds-react";
import React from "react";
import { ExampleComponent } from "../../lib";

export const Demo: ExampleComponent = () => {
  return (
    <div className="stories-sandbox-column">
      <Heading className="text-text-muted" size="medium" level="3">
        Medium
      </Heading>
      <Detail spacing>Ullamco ut laboris irure</Detail>

      <Heading className="text-text-muted" size="medium" level="3">
        Small
      </Heading>
      <Detail size="small">Ullamco ut laboris irure</Detail>
    </div>
  );
};

Demo.react = `
<Detail  spacing>Ullamco ut laboris irure</Detail>
<Detail size="small">Ullamco ut laboris irure</Detail>
`;
