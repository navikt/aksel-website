import { Button } from "@navikt/ds-react";
import React from "react";
import { HtmlWrapper, InferReact } from "../../../components";

const Primary = () => (
  <>
    <InferReact>
      {`<Button variant="primary">
        Primary button
      </Button>
      <Button variant="primary" size="small">
        Primary button
      </Button>`}
    </InferReact>
    <HtmlWrapper>
      <Button variant="primary">Primary button</Button>
      <Button variant="primary" size="small">
        Primary button
      </Button>
    </HtmlWrapper>
  </>
);

export default Primary;
