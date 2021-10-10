import { Button } from "@navikt/ds-react";
import React from "react";
import { HtmlWrapper, InferReact } from "../../../components";

const Danger = () => (
  <>
    <InferReact>
      {`<Button variant="danger">
        Danger button
      </Button>
      <Button variant="danger" size="small">
        Danger button
      </Button>`}
    </InferReact>
    <HtmlWrapper>
      <Button variant="danger">Danger button</Button>
      <Button variant="danger" size="small">
        Danger button
      </Button>
    </HtmlWrapper>
  </>
);

export default Danger;
