import { dateStr } from "@/utils";
import { BodyShort } from "@navikt/ds-react";
import cl from "classnames";
import * as React from "react";

const LastUpdated = ({
  date,
}: {
  date: string;
  simple?: boolean;
}): JSX.Element => {
  return (
    <BodyShort
      size="small"
      as="span"
      className={cl("flex items-center text-text-muted")}
    >
      {`Oppdatert ${dateStr(date)}`}
    </BodyShort>
  );
};

export default LastUpdated;
