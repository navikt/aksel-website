import { Alert, Heading, BodyLong } from "@navikt/ds-react";
import cl from "classnames";

export const UnderArbeid = ({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) => (
  <Alert
    variant="info"
    className={cl("dynamic-wrapper-prose mb-12", className)}
  >
    <Heading level="2" size="small" spacing>
      Under arbeid
    </Heading>
    <BodyLong>{text ? text : "Siden blir for tiden oppdatert!"}</BodyLong>
  </Alert>
);
