import { Button } from "@navikt/ds-react";
import React from "react";
import { InferHtml, InferReact, PreviewWrapper } from "../../../components";

const Disabled = () => (
  <>
    <InferReact>
      {`<Button variant="primary" disabled>
        Disabled button
      </Button>
      <Button variant="primary" disabled size="small">
        Disabled button
      </Button>`}
    </InferReact>
    <InferHtml>
      {`<button
          disabled="true"
          class="navds-button navds-button--primary navds-button--medium"
        >
          <span class="navds-button__inner navds-body-short">
            Disabled button
          </span>
        </button>
        <button
          disabled="true"
          class="navds-button navds-button--primary navds-button--small"
        >
          <span class="navds-button__inner navds-body-short navds-body-short--small">
            Disabled button
          </span>
        </button>`}
    </InferHtml>
    <PreviewWrapper>
      <Button variant="primary" disabled={true}>
        Disabled button
      </Button>
      <Button variant="primary" disabled={true} size="small">
        Disabled button
      </Button>
    </PreviewWrapper>
  </>
);

export default Disabled;
