import { Button, Loader } from "@navikt/ds-react";
import React from "react";
import { HtmlWrapper, InferReact } from "../../components";

const WithLoader = () => (
  <>
    <InferReact>
      {`<Button variant="primary" aria-label="laster innhold...">
        Button <Loader aria-label="lastesirkel"/>
      </Button>
      <Button variant="primary" size="small" aria-label="laster innhold...">
        Button <Loader aria-label="lastesirkel"/>
      </Button>`}
    </InferReact>
    <HtmlWrapper>
      <Button variant="primary" aria-label="laster innhold...">
        Button <Loader aria-label="lastesirkel" />
      </Button>
      <Button variant="primary" size="small" aria-label="laster innhold...">
        Button <Loader aria-label="lastesirkel" />
      </Button>
    </HtmlWrapper>
  </>
);

export default WithLoader;
