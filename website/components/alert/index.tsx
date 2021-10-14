import { Alert as DsAlert, Heading } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";
import { Alert as AlertT } from "../../lib/autogen-types";
import { SanityBlockContent } from "../SanityBlockContent";

const StyledAlert = styled(DsAlert)`
  > * .navds-typo--spacing :last-child {
    margin: 0;
  }
`;

const Alert = ({ node }: { node: AlertT }): JSX.Element => {
  return (
    <StyledAlert variant={node.variant} size={node.size}>
      {node.heading && (
        <Heading
          spacing
          size={node.size === "medium" ? "small" : "xsmall"}
          as={node.heading_level}
        >
          {node.heading}
        </Heading>
      )}
      <SanityBlockContent blocks={node.body} size={node.size} />
    </StyledAlert>
  );
};

export default Alert;
