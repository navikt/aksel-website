import React from "react";
import { Link, Alert } from "@navikt/ds-react";
import { ExternalLink } from "@navikt/ds-icons";

export const LinkExample = () => (
  <p>
    Dette er en <Link href="#">tekstlenke</Link> i en setning.
  </p>
);

LinkExample.react = `<p>
Dette er en <Link href="#">tekstlenke</Link> i en setning.
</p>`;

export const LinkOnAlert = () => (
  <>
    <Alert variant="info">
      Dette er en <Link href="#">tekstlenke</Link> i en setning.
    </Alert>
  </>
);

LinkOnAlert.react = `<Alert variant="info">
Dette er en <Link href="#">tekstlenke</Link> i en setning.
</Alert>`;

export const LinkMedIkon = () => (
  <>
    <p>
      Dette er en{" "}
      <Link href="#">
        tekstlenke <ExternalLink />
      </Link>{" "}
      i en setning.
    </p>
  </>
);

LinkMedIkon.react = `<p>
Dette er en{" "}
<Link href="#">
  tekstlenke <ExternalLink />
</Link>{" "}
i en setning.
</p>`;
