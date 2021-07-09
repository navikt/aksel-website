import * as React from "react";
import { Tag as DsTag } from "@navikt/ds-react";

const StatusTag = ({ status }: { status: string }): JSX.Element => {
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
