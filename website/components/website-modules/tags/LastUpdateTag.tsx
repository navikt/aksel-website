import moment from "moment";
import * as React from "react";
import { BodyShort } from "@navikt/ds-react";

const LastUpdated = ({ date }: { date: string }): JSX.Element => {
  return (
    <BodyShort size="small">{`Oppdatert ${moment(date).format(
      "DD. MMM. YY"
    )}`}</BodyShort>
  );
};

export default LastUpdated;
