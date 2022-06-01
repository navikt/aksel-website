import { Alert, Heading, BodyLong } from "@navikt/ds-react";

export const UnderArbeid = ({ text }: { text?: string }) => (
  <Alert variant="info" className="mx-auto max-w-prose xs:w-[90%]">
    <Heading level="2" size="small" spacing>
      Under arbeid
    </Heading>
    <BodyLong>{text ? text : "Siden blir for tiden oppdatert!"}</BodyLong>
  </Alert>
);
