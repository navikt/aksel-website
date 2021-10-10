import { Button } from "@navikt/ds-react";
import React from "react";
import { HtmlWrapper, InferReact } from "../../components";

const Tertiary = () => (
  <>
    <InferReact>
      {`<Button variant="tertiary">
        Tertiary button
      </Button>
      <Button variant="tertiary" size="small">
        Tertiary button
      </Button>`}
    </InferReact>
    <HtmlWrapper>
      <Button variant="tertiary">Tertiary button</Button>
      <Button variant="tertiary" size="small">
        Tertiary button
      </Button>
    </HtmlWrapper>
  </>
);

export default Tertiary;
