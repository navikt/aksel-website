import React from "react";
import { Button, Loader } from "@navikt/ds-react";
import { InferHtml, InferReact } from "./InferCode";
import { Close } from "@navikt/ds-icons";

export default {
  title: "ds-react/Button",
  component: Button,
};

export const Collection = () => (
  <>
    <InferReact>
      {`<Button variant="primary">Primary button</Button>
      <Button variant="secondary">Secondary button</Button>
      <Button variant="tertiary">Tertiary button</Button>
      <Button variant="danger">Danger button</Button>`}
    </InferReact>
    <InferHtml>
      <Button variant="primary">Primary button</Button>
      <Button variant="secondary">Secondary button</Button>
      <Button variant="tertiary">Tertiary button</Button>
      <Button variant="danger">Danger button</Button>
    </InferHtml>
  </>
);

export const Primary = () => (
  <>
    <InferReact>
      {`<Button variant="primary">
        Primary button
      </Button>
      <Button variant="primary" size="small">
      Primary button
      </Button>`}
    </InferReact>
    <InferHtml>
      <Button variant="primary">Primary button</Button>
      <Button variant="primary" size="small">
        Primary button
      </Button>
    </InferHtml>
  </>
);

export const Secondary = () => (
  <>
    <InferReact>
      {`<Button variant="secondary">
        Secondary button
      </Button>
      <Button variant="secondary" size="small">
        Secondary button
      </Button>`}
    </InferReact>
    <InferHtml>
      <Button variant="secondary">Secondary button</Button>
      <Button variant="secondary" size="small">
        Secondary button
      </Button>
    </InferHtml>
  </>
);

export const Tertiary = () => (
  <>
    <InferReact>
      {`<Button variant="tertiary">
        Tertiary button
      </Button>
      <Button variant="tertiary" size="small">
        Tertiary button
      </Button>`}
    </InferReact>
    <InferHtml>
      <Button variant="tertiary">Tertiary button</Button>
      <Button variant="tertiary" size="small">
        Tertiary button
      </Button>
    </InferHtml>
  </>
);

export const Danger = () => (
  <>
    <InferReact>
      {`<Button variant="danger">
        Danger button
      </Button>
      <Button variant="danger" size="small">
        Danger button
      </Button>`}
    </InferReact>
    <InferHtml>
      <Button variant="danger">Danger button</Button>
      <Button variant="danger" size="small">
        Danger button
      </Button>
    </InferHtml>
  </>
);

export const Disabled = () => (
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
      <Button variant="primary" disabled>
        Disabled button
      </Button>
      <Button variant="primary" disabled size="small">
        Disabled button
      </Button>
    </InferHtml>
  </>
);

export const WithIcon = () => (
  <>
    <InferReact>
      {`<Button variant="primary">
        Button <Close />
      </Button>
      <Button variant="primary" size="small">
        Button <Close />
      </Button>`}
    </InferReact>
    <InferHtml>
      <Button variant="primary">
        Button <Close />
      </Button>
      <Button variant="primary" size="small">
        Button <Close />
      </Button>
    </InferHtml>
  </>
);

export const WithLoader = () => (
  <>
    <InferReact>
      {`<Button variant="primary">
        Button <Loader />
      </Button>
      <Button variant="primary" size="small">
        Button <Loader />
      </Button>`}
    </InferReact>
    <InferHtml>
      <Button variant="primary">
        Button <Loader />
      </Button>
      <Button variant="primary" size="small">
        Button <Loader />
      </Button>
    </InferHtml>
  </>
);
