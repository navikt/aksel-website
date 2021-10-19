import React from "react";
import { Loader, Button } from "@navikt/ds-react";

export const LoaderExample = () => (
  <>
    <Loader title="Laster inn ny data..." />
  </>
);

LoaderExample.react = `<Loader title="Laster inn ny data..." />`;

export const LoaderAllSizes = () => (
  <>
    <Loader size="2xlarge" />
    <Loader size="xlarge" />
    <Loader size="large" />
    <Loader size="medium" />
    <Loader size="small" />
    <Loader size="xsmall" />
  </>
);
LoaderAllSizes.react = `<Loader size="2xlarge" />
<Loader size="xlarge" />
<Loader size="large" />
<Loader size="medium" />
<Loader size="small" />
<Loader size="xsmall" />`;

export const LoaderAllVariants = () => (
  <>
    <Loader size="2xlarge" variant="neutral" />
    <Loader size="2xlarge" variant="interaction" />
    <Loader size="2xlarge" variant="inverted" />
  </>
);
LoaderAllVariants.react = `<Loader size="2xlarge" variant="neutral" />
<Loader size="2xlarge" variant="interaction" />
<Loader size="2xlarge" variant="inverted" />`;

export const LoaderTransparent = () => (
  <>
    <Loader size="2xlarge" transparent />
  </>
);

LoaderTransparent.react = `<Loader size="2xlarge" transparent />`;

export const LoaderMedButton = () => (
  <>
    <Button>
      Laster inn nytt innhold...
      <Loader />
    </Button>
  </>
);

LoaderMedButton.react = `<Button>
Laster inn nytt innhold...
<Loader />
</Button>`;
