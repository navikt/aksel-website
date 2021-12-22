import { LinkPanel as DsLinkPanel } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";
import { slugger } from "../..";
import { LinkPanel as LinkPanelT } from "../../../lib/autogen-types";
import { withErrorBoundary } from "../../website-features/error-boundary";

const ScPanel = styled(DsLinkPanel)`
  max-width: 400px;
`;

const LinkPanel = ({ node }: { node: LinkPanelT }): JSX.Element => {
  if (
    !node ||
    !node.heading ||
    (node.external && !node.external_link) ||
    (!node.external &&
      !(node.internal_link as { slug?: { current: string } })?.slug)
  )
    return null;

  const link = node.external
    ? node.external_link
    : `/${
        (node.internal_link as { slug?: { current: string } }).slug?.current
      }`;
  const slug =
    node.heading &&
    node.heading_level === "h2" &&
    slugger.slug(node.heading.toString());

  return (
    <ScPanel href={link}>
      <DsLinkPanel.Title as={node.heading_level} id={slug || undefined}>
        {node.heading}
      </DsLinkPanel.Title>
      {node.body && (
        <DsLinkPanel.Description>{node.body}</DsLinkPanel.Description>
      )}
    </ScPanel>
  );
};

export default withErrorBoundary(LinkPanel, "LinkPanel");
