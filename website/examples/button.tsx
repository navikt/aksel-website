import { Close } from "@navikt/ds-icons";
import { Button, Loader } from "@navikt/ds-react";
import React from "react";
import {
  HtmlWrapper,
  InferHtml,
  InferReact,
  PreviewWrapper,
} from "../components";

export const ButtonAllVariants = () => (
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

export const ButtonPrimary = () => (
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

export const ButtonSecondary = () => (
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

export const ButtonTertiary = () => (
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

export const ButtonDanger = () => (
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

export const ButtonDisabled = () => (
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

export const ButtonWithIcon = () => (
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

export const ButtonWithLoader = () => (
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
