import React from "react";
import { Loader, Button } from "@navikt/ds-react";
import styled from "styled-components";
import { ExampleComponent } from "../lib";

export const LoaderExample: ExampleComponent = () => (
  <>
    <Loader title="Laster inn ny data..." />
  </>
);

LoaderExample.react = `<Loader title="Laster inn ny data..." />`;

export const LoaderAllSizes: ExampleComponent = () => (
  <div>
    <Loader size="2xlarge" />
    <Loader size="xlarge" />
    <Loader size="large" />
    <Loader size="medium" />
    <Loader size="small" />
    <Loader size="xsmall" />
  </div>
);

LoaderAllSizes.react = `<Loader size="2xlarge" />
<Loader size="xlarge" />
<Loader size="large" />
<Loader size="medium" />
<Loader size="small" />
<Loader size="xsmall" />`;

export const LoaderNeutral: ExampleComponent = () => (
  <>
    <Loader size="2xlarge" variant="neutral" />
  </>
);

LoaderNeutral.react = `<Loader size="2xlarge" variant="neutral" />`;

export const LoaderInteraction: ExampleComponent = () => (
  <>
    <Loader size="2xlarge" variant="interaction" />
  </>
);

LoaderInteraction.react = `<Loader size="2xlarge" variant="interaction" />`;

export const LoaderInverted: ExampleComponent = () => (
  <>
    <Loader size="2xlarge" variant="inverted" />
  </>
);

LoaderInverted.react = `<Loader size="2xlarge" variant="inverted" />`;
LoaderInverted.bg = "inverted";

export const LoaderTransparent: ExampleComponent = () => (
  <>
    <Loader size="2xlarge" transparent />
  </>
);

LoaderTransparent.react = `<Loader size="2xlarge" transparent />`;

const ScFlexGrow = styled.div`
  display: flex;
  width: 6rem;
  > * {
    flex: 1 1%;
  }
`;

export const LoaderMedButton: ExampleComponent = () => (
  <ScFlexGrow>
    <Button>
      <Loader title="Laster inn nytt innhold..." />
    </Button>
  </ScFlexGrow>
);

LoaderMedButton.react = `<Button>
Laster inn nytt innhold...
<Loader title="Laster inn nytt innhold..." />
</Button>`;
