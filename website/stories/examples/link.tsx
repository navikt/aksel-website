import React from "react";
import { Link, Alert } from "@navikt/ds-react";
import { ExternalLink } from "@navikt/ds-icons";
import { ExampleComponent } from "../../lib";

export const LinkExample: ExampleComponent = () => (
  <p>
    Dette er en <Link href="#">tekstlenke</Link> i en setning.
  </p>
);

LinkExample.react = `<p>
Dette er en <Link href="#">tekstlenke</Link> i en setning.
</p>`;

export const LinkOnAlert: ExampleComponent = () => (
  <>
    <Alert variant="info">
      Dette er en <Link href="#">tekstlenke</Link> i en setning.
    </Alert>
  </>
);

LinkOnAlert.react = `<Alert variant="info">
Dette er en <Link href="#">tekstlenke</Link> i en setning.
</Alert>`;

export const LinkMedIkon: ExampleComponent = () => (
  <>
    <p>
      Dette er en{" "}
      <Link href="#">
        tekstlenke <ExternalLink title="åpne i ny fane" />
      </Link>{" "}
      i en setning.
    </p>
  </>
);

LinkMedIkon.react = `<p>
Dette er en{" "}
<Link href="#">
  tekstlenke <ExternalLink title="åpne i ny fane"/>
</Link>{" "}
i en setning.
</p>`;
