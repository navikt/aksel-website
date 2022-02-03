import { BodyLong, Heading } from "@navikt/ds-react";
import { Stack } from "@sanity/ui";
import { withDocument } from "part:@sanity/form-builder";
import React, { HTMLAttributes } from "react";

interface ViewProps extends HTMLAttributes<HTMLDivElement> {}

const IntroPage = React.forwardRef<HTMLDivElement, ViewProps>((props, ref) => {
  return (
    <Stack ref={ref} space={[3, 1, 2, 4]}>
      <Heading level="2" size="medium" spacing>
        Velkommen til Aksel CMS
      </Heading>
      <BodyLong>
        Hvis du logget inn med NAV SSO har du nå bare lese-rettigheter. For å få
        redigering/publisering-rettigheter må en admin gi deg det.
      </BodyLong>
      <BodyLong spacing>
        Hør med Ken Aleksander Johansen på slack, eller bare send en melding til
        oss på #designsystem slack så fikser vi det.
      </BodyLong>
      <Heading level="3" size="small">
        Innhold
      </Heading>
      <BodyLong>
        Akkurat nå er det bare Designsystem-portalen som er oppe å går 100%.
        Dette vil si at man kan skrive og publisere innhold under "God praksis",
        men innholdet blir ikke lett tilgjengelig på design.nav.no.
      </BodyLong>
    </Stack>
  );
});

export default IntroPage;
