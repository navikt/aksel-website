import moment from "moment";
import * as React from "react";
import { BodyShort } from "@navikt/ds-react";
import { Calender } from "@navikt/ds-icons";
import cl from "classnames";

const LastUpdated = ({
  date,
  simple,
}: {
  date: string;
  simple?: boolean;
}): JSX.Element => {
  return (
    <BodyShort
      size="small"
      as="span"
      className={cl("flex items-center gap-1", { "text-text-muted": simple })}
    >
      {!simple && <Calender title="sist oppdatert" />}
      {`Oppdatert ${moment(date).format("DD. MMM. YY")}`}
    </BodyShort>
  );
};

export default LastUpdated;
