import * as React from "react";
import { Tag as DsTag } from "@navikt/ds-react";

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
          <DsTag variant="info" size="small">
            Beta
          </DsTag>
        );
      case "published":
        return null;
      /* return (
          <DsTag variant="success" size="small">
            Publisert
          </DsTag>
        ); */
      default:
        return null;
    }
  };

  return getTag();
};

export default StatusTag;
