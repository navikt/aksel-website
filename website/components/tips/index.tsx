import { Detail } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";
import { Tips as TipsT } from "../../lib/autogen-types";
import { SanityBlockContent } from "../SanityBlockContent";
import { withErrorBoundary } from "../error-boundary";

const ScWrapper = styled.div`
  padding-left: var(--navds-spacing-8);
  box-shadow: -2px 0 0 0 var(--navds-semantic-color-border);
  margin: var(--navds-spacing-10) 0;
`;

const ScDetail = styled(Detail)`
  color: var(--navds-semantic-color-text-muted);
`;

const Tips = ({ node }: { node: TipsT }): JSX.Element => {
  if (!node || !node.body) {
    return null;
  }

  return (
    <ScWrapper>
      <ScDetail spacing>TIPS</ScDetail>
      <SanityBlockContent blocks={node.body} />
    </ScWrapper>
  );
};

export default withErrorBoundary(Tips, "Tips");
