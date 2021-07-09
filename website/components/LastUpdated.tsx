import moment from "moment";
import * as React from "react";
import styled from "styled-components";

const Div = styled.div``;

const LastUpdated = ({ date }: { date: string }): JSX.Element => {
  return <Div>{`Oppdatert ${moment(date).format("DD. MMM. YY")}`}</Div>;
};

export default LastUpdated;
