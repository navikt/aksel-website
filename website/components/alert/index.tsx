import { Alert as DsAlert, Heading } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";
import { slugger } from "..";
import { Alert as AlertT } from "../../lib/autogen-types";
import { SanityBlockContent } from "../SanityBlockContent";

const StyledAlert = styled(DsAlert)`
  > * .navds-typo--spacing :last-child {
    margin: 0;
  }

  /* Contrast fix */
  code {
    color: var(--navds-color-red-50);
    background-color: transparent;
    padding: 0;
  }
`;

const Alert = ({ node }: { node: AlertT }): JSX.Element => {
  const slug =
    node.heading &&
    node.heading_level === "h2" &&
    slugger.slug(node.heading.toString());

  return (
    <StyledAlert variant={node.variant} size={node.size}>
      {node.heading && (
        <Heading
          spacing
          size={node.size === "medium" ? "small" : "xsmall"}
          as={node.heading_level}
          id={slug}
        >
          {node.heading}
        </Heading>
      )}
      <SanityBlockContent blocks={node.body} size={node.size} />
    </StyledAlert>
  );
};

export default Alert;
