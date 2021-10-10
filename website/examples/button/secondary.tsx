import { Button } from "@navikt/ds-react";
import React from "react";
import { HtmlWrapper, InferReact } from "../../components";

const Secondary = () => (
  <>
    <InferReact>
      {`<Button variant="secondary">
        Secondary button
      </Button>
      <Button variant="secondary" size="small">
        Secondary button
      </Button>`}
    </InferReact>
    <HtmlWrapper>
      <Button variant="secondary">Secondary button</Button>
      <Button variant="secondary" size="small">
        Secondary button
      </Button>
    </HtmlWrapper>
  </>
);

export default Secondary;
