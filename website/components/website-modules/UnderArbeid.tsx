import { Alert, Heading, BodyLong } from "@navikt/ds-react";

export const UnderArbeid = () => (
  <Alert variant="info" className="mx-auto max-w-prose xs:w-[90%]">
    <Heading level="2" size="small" spacing>
      Under arbeid
    </Heading>
    <BodyLong>Siden blir for tiden oppdatert! </BodyLong>
  </Alert>
);
