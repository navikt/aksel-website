import moment from "moment";
import * as React from "react";
import styled from "styled-components";

const Div = styled.div`
  /* position: absolute;
  top: var(--navds-spacing-6);
  right: 0; */
`;

const LastUpdated = ({ date }) => {
  return <Div>{`Oppdatert ${moment(date).format("DD. MMM. YY")}`}</Div>;
};

export default LastUpdated;
