import React from "react";
import { Loader, Button } from "@navikt/ds-react";
import styled from "styled-components";

export const LoaderExample = () => (
  <>
    <Loader title="Laster inn ny data..." />
  </>
);

LoaderExample.react = `<Loader title="Laster inn ny data..." />`;

export const LoaderAllSizes = () => (
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

export const LoaderNeutral = () => (
  <>
    <Loader size="2xlarge" variant="neutral" />
  </>
);

LoaderNeutral.react = `<Loader size="2xlarge" variant="neutral" />`;

export const LoaderInteraction = () => (
  <>
    <Loader size="2xlarge" variant="interaction" />
  </>
);

LoaderInteraction.react = `<Loader size="2xlarge" variant="interaction" />`;

export const LoaderInverted = () => (
  <>
    <Loader size="2xlarge" variant="inverted" />
  </>
);

LoaderInverted.react = `<Loader size="2xlarge" variant="inverted" />`;
LoaderInverted.inverted = true;

export const LoaderTransparent = () => (
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

export const LoaderMedButton = () => (
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
