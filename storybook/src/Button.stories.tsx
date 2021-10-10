import React from "react";
import { Button, Loader } from "@navikt/ds-react";
import {
  HtmlWrapper,
  InferHtml,
  InferReact,
  PreviewWrapper,
} from "./InferCode";
import { Close } from "@navikt/ds-icons";

export default {
  title: "ds-react/Button",
  component: Button,
};

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
    <HtmlWrapper>
      <Button variant="primary">Primary button</Button>
      <Button variant="primary" size="small">
        Primary button
      </Button>
    </HtmlWrapper>
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
    <HtmlWrapper>
      <Button variant="secondary">Secondary button</Button>
      <Button variant="secondary" size="small">
        Secondary button
      </Button>
    </HtmlWrapper>
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
    <HtmlWrapper>
      <Button variant="tertiary">Tertiary button</Button>
      <Button variant="tertiary" size="small">
        Tertiary button
      </Button>
    </HtmlWrapper>
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
    <HtmlWrapper>
      <Button variant="danger">Danger button</Button>
      <Button variant="danger" size="small">
        Danger button
      </Button>
    </HtmlWrapper>
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
    <HtmlWrapper>
      <Button variant="primary">
        Button
        <Close />
      </Button>
      <Button variant="primary" size="small">
        Button
        <Close />
      </Button>
    </HtmlWrapper>
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
    <HtmlWrapper>
      <Button variant="primary">
        Button <Loader />
      </Button>
      <Button variant="primary" size="small">
        Button <Loader />
      </Button>
    </HtmlWrapper>
  </>
);
