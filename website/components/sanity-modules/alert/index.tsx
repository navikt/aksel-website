import { Alert as DsAlert, Heading } from "@navikt/ds-react";
import React from "react";
import { slugger } from "../..";
import { Alert as AlertT } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";

const Alert = ({ node }: { node: AlertT }): JSX.Element => {
  const slug =
    node.heading &&
    node.heading_level === "h2" &&
    slugger.slug(node.heading.toString());

  return (
    <div className="section--small">
      <DsAlert variant={node.variant} size={node.size}>
        {node.heading && (
          <Heading
            spacing
            size={node.size === "medium" ? "small" : "xsmall"}
            as={node.heading_level}
            id={slug || undefined}
          >
            {node.heading}
          </Heading>
        )}
        <SanityBlockContent blocks={node.body} size={node.size} noLastMargin />
      </DsAlert>
    </div>
  );
};

export default Alert;
