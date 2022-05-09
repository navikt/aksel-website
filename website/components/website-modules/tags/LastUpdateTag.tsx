import { dateStr } from "@/utils";
import { Calender } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";
import cl from "classnames";
import * as React from "react";

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
      {`Oppdatert ${dateStr(date)}`}
    </BodyShort>
  );
};

export default LastUpdated;
