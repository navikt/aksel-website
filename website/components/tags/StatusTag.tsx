import * as React from "react";
import { Tag as DsTag } from "@navikt/ds-react";
import styled from "styled-components";

const ScPurpleTag = styled(DsTag)`
  background-color: var(--navds-global-color-purple-400);
  color: var(--navds-semantic-color-text-inverted);
  border: none;
`;

const StatusTag = ({ status }: { status: string }): JSX.Element => {
  const getTag = () => {
    switch (status) {
      case "wip":
        return (
          <DsTag variant="warning" size="small">
            Work in progress
          </DsTag>
        );
      case "beta":
        return (
          <ScPurpleTag variant="info" size="small">
            Beta
          </ScPurpleTag>
        );
      case "published":
        return null;
      default:
        return null;
    }
  };

  return getTag();
};

export default StatusTag;
