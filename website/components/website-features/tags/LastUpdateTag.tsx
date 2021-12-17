import moment from "moment";
import * as React from "react";
import * as S from "./tag.styles";

const LastUpdated = ({ date }: { date: string }): JSX.Element => {
  return (
    <S.Tag size="small" variant="info">{`Oppdatert ${moment(date).format(
      "DD. MMM. YY"
    )}`}</S.Tag>
  );
};

export default LastUpdated;
