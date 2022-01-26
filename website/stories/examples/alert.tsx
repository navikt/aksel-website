import React from "react";
import { Alert, BodyLong, Heading, Link } from "@navikt/ds-react";
import { ExampleComponent } from "../../lib";

export const AlertAllVariants: ExampleComponent = () => (
  <div className="stories-sandbox-column">
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
  </div>
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

export const AlertWithSmall: ExampleComponent = () => (
  <div className="stories-sandbox-column">
    <Alert variant="info">Nå kan du sende inn søknaden.</Alert>
    <Alert variant="info" size="small">
      Nå kan du sende inn søknaden.
    </Alert>
  </div>
);

AlertWithSmall.react = `
<Alert variant="info">Nå kan du sende inn søknaden.</Alert>
    <Alert variant="info" size="small">Nå kan du sende inn søknaden.</Alert>`;

export const AlertWithHeading: ExampleComponent = () => (
  <div className="stories-sandbox-column">
    <Alert variant="info">
      <Heading spacing size="small" level="2">
        Midlertidige regler for arbeidsledige og permitterte
      </Heading>
      <BodyLong>
        Fra xx.xx.xxxx vil nye søknader bli behandlet etter de vanlige reglene
        som gjaldt før xxxx. Hvis du får innvilget dagpenger, gjelder
        forlengelsene også for deg frem til og med xx.xx.xxxx.
      </BodyLong>
    </Alert>
    <Alert variant="info" size="small">
      <Heading spacing size="small" level="2">
        Midlertidige regler for arbeidsledige og permitterte
      </Heading>
      <BodyLong>
        Fra xx.xx.xxxx vil nye søknader bli behandlet etter de vanlige reglene
        som gjaldt før xxxx. Hvis du får innvilget dagpenger, gjelder
        forlengelsene også for deg frem til og med xx.xx.xxxx.
      </BodyLong>
    </Alert>
  </div>
);

AlertWithHeading.react = `
<Alert variant="info">
      <Heading spacing size="small" level="2">
        Midlertidige regler for arbeidsledige og permitterte
      </Heading>
      <BodyLong>
        Fra xx.xx.xxxx vil nye søknader bli behandlet etter de vanlige reglene
        som gjaldt før xxxx. Hvis du får innvilget dagpenger, gjelder
        forlengelsene også for deg frem til og med xx.xx.xxxx.
      </BodyLong>
    </Alert>
    <Alert variant="info" size="small">
      <Heading spacing size="small" level="2">
        Midlertidige regler for arbeidsledige og permitterte
      </Heading>
      <BodyLong>
        Fra xx.xx.xxxx vil nye søknader bli behandlet etter de vanlige reglene
        som gjaldt før xxxx. Hvis du får innvilget dagpenger, gjelder
        forlengelsene også for deg frem til og med xx.xx.xxxx.
      </BodyLong>
    </Alert>`;

export const AlertInline: ExampleComponent = () => (
  <div className="stories-sandbox-column">
    <Alert variant="info" inline>
      Nå kan du sende inn søknaden.
    </Alert>
    <Alert variant="info" inline size="small">
      Nå kan du sende inn søknaden.
    </Alert>
  </div>
);

AlertInline.react = `
<Alert variant="info" inline>
      Nå kan du sende inn søknaden.
    </Alert>
    <Alert variant="info" inline size="small">
      Nå kan du sende inn søknaden.
    </Alert>`;

export const AlertFullwidth: ExampleComponent = () => (
  <div className="stories-sandbox-column">
    <Alert variant="info" fullWidth>
      Nå kan du sende inn søknaden.
    </Alert>
    <Alert variant="info" fullWidth size="small">
      Nå kan du sende inn søknaden.
    </Alert>
  </div>
);

AlertFullwidth.react = `
<Alert variant="info" fullWidth>
      Nå kan du sende inn søknaden.
    </Alert>
    <Alert variant="info" fullWidth size="small">
      Nå kan du sende inn søknaden.
    </Alert>`;
