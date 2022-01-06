import { Detail } from "@navikt/ds-react";
import React, { useContext } from "react";
import styled from "styled-components";
import { Tips as TipsT } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";
import { withErrorBoundary } from "../../website-features/error-boundary";
import { LayoutContext } from "../..";

const ScWrapper = styled.div`
  padding-left: var(--navds-spacing-8);
  box-shadow: -2px 0 0 0 var(--navds-semantic-color-border);
  margin: var(--navds-spacing-10) 0;

  &[data-mobile="true"] {
    padding-left: var(--navds-spacing-4);
  }
`;

const ScDetail = styled(Detail)`
  color: var(--navds-semantic-color-text-muted);
`;

const Tips = ({ node }: { node: TipsT }): JSX.Element => {
  const layout = useContext(LayoutContext);

  if (!node || !node.body) {
    return null;
  }

  return (
    <ScWrapper data-mobile={layout.isMobile}>
      <ScDetail spacing>TIPS</ScDetail>
      <SanityBlockContent blocks={node.body} />
    </ScWrapper>
  );
};

export default withErrorBoundary(Tips, "Tips");
