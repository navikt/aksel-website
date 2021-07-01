import * as React from "react";
import styled from "styled-components";
import { Tag as DsTag } from "@navikt/ds-react";

const Tag = styled.span`
  padding: var(--navds-spacing-1) var(--navds-spacing-2);
  border-radius: 2px;
`;

const Wip = styled(Tag)`
  background-color: var(--navds-color-orange-30);
`;
const Beta = styled(Tag)`
  background-color: var(--navds-color-blue-30);
`;
const Published = styled(Tag)`
  background-color: var(--navds-color-green-30);
`;

const StatusTag = ({ status }: { status: string }) => {
  const getTag = () => {
    switch (status) {
      case "wip":
        return <DsTag variant="warning">Work in progress</DsTag>;
      case "beta":
        return <DsTag variant="info">Beta</DsTag>;
      case "published":
        return <DsTag variant="success">Publisert</DsTag>;
      default:
        return null;
    }
  };

  return getTag();
};

export default StatusTag;
