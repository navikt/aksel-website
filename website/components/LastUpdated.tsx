import { Tag } from "@navikt/ds-react";
import moment from "moment";
import * as React from "react";
import styled from "styled-components";

const StyledTag = styled(Tag)`
  background-color: var(--navds-color-gray-10);
  border-color: var(--navds-color-gray-40);
`;

const LastUpdated = ({ date }: { date: string }): JSX.Element => {
  return (
    <StyledTag size="small" variant="info">{`Oppdatert ${moment(date).format(
      "DD. MMM. YY"
    )}`}</StyledTag>
  );
};

export default LastUpdated;
