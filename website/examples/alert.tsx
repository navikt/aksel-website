import React from "react";
import { Alert, Link } from "@navikt/ds-react";

export const AlertAllVariants = () => (
  <>
    <Alert variant="info">Nå kan du sende inn søknaden.</Alert>
    <Alert variant="success">Du har sendt søknaden.</Alert>
    <Alert variant="warning">
      Det er mange som bruker nav.no nå, derfor kan det ta litt tid før søknaden
      din kommer fram.
    </Alert>
    <Alert variant="error">
      Det er ikke mulig å sende søknaden akkurat nå, vennligst prøv igjen
      senere. Du er velkommen til å{" "}
      <Link href="#">følge med på hvordan det går.</Link>
    </Alert>
  </>
);

AlertAllVariants.react = `
<Alert variant="info">Nå kan du sende inn søknaden.</Alert>
    <Alert variant="success">Du har sendt søknaden.</Alert>
    <Alert variant="warning">
      Det er mange som bruker nav.no nå, derfor kan det ta litt tid før søknaden
      din kommer fram.
    </Alert>
    <Alert variant="error">
      Det er ikke mulig å sende søknaden akkurat nå, vennligst prøv igjen
      senere. Du er velkommen til å{" "}
      <Link href="#">følge med på hvordan det går.</Link>
    </Alert>`;

export const AlertWithSmall = () => (
  <>
    <Alert variant="info">Nå kan du sende inn søknaden.</Alert>
    <Alert variant="info" size="small">
      Nå kan du sende inn søknaden.
    </Alert>
  </>
);

AlertWithSmall.react = `
<Alert variant="info">Nå kan du sende inn søknaden.</Alert>
    <Alert variant="info" size="small">Nå kan du sende inn søknaden.</Alert>`;

export const AlertWithHeading = () => (
  <>
    <Alert variant="info">
      <Alert.Title>
        Midlertidige regler for arbeidsledige og permitterte
      </Alert.Title>
      <Alert.Content>
        Fra xx.xx.xxxx vil nye søknader bli behandlet etter de vanlige reglene
        som gjaldt før xxxx. Hvis du får innvilget dagpenger, gjelder
        forlengelsene også for deg frem til og med xx.xx.xxxx.
      </Alert.Content>
    </Alert>
    <Alert variant="info" size="small">
      <Alert.Title>
        Midlertidige regler for arbeidsledige og permitterte
      </Alert.Title>
      <Alert.Content>
        Fra xx.xx.xxxx vil nye søknader bli behandlet etter de vanlige reglene
        som gjaldt før xxxx. Hvis du får innvilget dagpenger, gjelder
        forlengelsene også for deg frem til og med xx.xx.xxxx.
      </Alert.Content>
    </Alert>
  </>
);

AlertWithHeading.react = `
<Alert variant="info">
      <Alert.Title>
        Midlertidige regler for arbeidsledige og permitterte
      </Alert.Title>
      <Alert.Content>
        Fra xx.xx.xxxx vil nye søknader bli behandlet etter de vanlige reglene
        som gjaldt før xxxx. Hvis du får innvilget dagpenger, gjelder
        forlengelsene også for deg frem til og med xx.xx.xxxx.
      </Alert.Content>
    </Alert>
    <Alert variant="info" size="small">
      <Alert.Title>
        Midlertidige regler for arbeidsledige og permitterte
      </Alert.Title>
      <Alert.Content>
        Fra xx.xx.xxxx vil nye søknader bli behandlet etter de vanlige reglene
        som gjaldt før xxxx. Hvis du får innvilget dagpenger, gjelder
        forlengelsene også for deg frem til og med xx.xx.xxxx.
      </Alert.Content>
    </Alert>`;

export const AlertInline = () => (
  <>
    <Alert variant="info" inline>
      Nå kan du sende inn søknaden.
    </Alert>
    <Alert variant="info" inline size="small">
      Nå kan du sende inn søknaden.
    </Alert>
  </>
);

AlertInline.react = `
<Alert variant="info" inline>
      Nå kan du sende inn søknaden.
    </Alert>
    <Alert variant="info" inline size="small">
      Nå kan du sende inn søknaden.
    </Alert>`;

export const AlertFullwidth = () => (
  <>
    <Alert variant="info" fullWidth>
      Nå kan du sende inn søknaden.
    </Alert>
    <Alert variant="info" fullWidth size="small">
      Nå kan du sende inn søknaden.
    </Alert>
  </>
);

AlertFullwidth.react = `
<Alert variant="info" fullWidth>
      Nå kan du sende inn søknaden.
    </Alert>
    <Alert variant="info" fullWidth size="small">
      Nå kan du sende inn søknaden.
    </Alert>`;
