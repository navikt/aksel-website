import { Close } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import React from "react";
import { HtmlWrapper, InferReact } from "../../../components";

const WithIcon = () => (
  <>
    <InferReact>
      {`<Button variant="primary">
        Button <Close aria-label="presentation"/>
      </Button>
      <Button variant="primary" size="small">
        Button <Close aria-label="presentation"/>
      </Button>`}
    </InferReact>
    <HtmlWrapper>
      <Button variant="primary">
        Button
        <Close aria-label="presentation" />
      </Button>
      <Button variant="primary" size="small">
        Button
        <Close aria-label="presentation" />
      </Button>
    </HtmlWrapper>
  </>
);

export default WithIcon;
