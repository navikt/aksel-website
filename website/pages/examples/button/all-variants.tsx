import { Button } from "@navikt/ds-react";
import React from "react";
import { HtmlWrapper, InferReact } from "../../../components";

export const Collection = () => (
  <>
    <InferReact>
      {`<Button variant="primary">Primary button</Button>
      <Button variant="secondary">Secondary button</Button>
      <Button variant="tertiary">Tertiary button</Button>
      <Button variant="danger">Danger button</Button>`}
    </InferReact>
    <HtmlWrapper>
      <Button variant="primary">Primary button</Button>
      <Button variant="secondary">Secondary button</Button>
      <Button variant="tertiary">Tertiary button</Button>
      <Button variant="danger">Danger button</Button>
    </HtmlWrapper>
  </>
);

export default Collection;
