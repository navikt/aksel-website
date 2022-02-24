import { LinkPanel as DsLinkPanel } from "@navikt/ds-react";
import React from "react";
import { slugger } from "../..";
import { LinkPanel as LinkPanelT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";

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
    <DsLinkPanel className="max-w-md" href={link}>
      <DsLinkPanel.Title as={node.heading_level} id={slug || undefined}>
        {node.heading}
      </DsLinkPanel.Title>
      {node.body && (
        <DsLinkPanel.Description>{node.body}</DsLinkPanel.Description>
      )}
    </DsLinkPanel>
  );
};

export default withErrorBoundary(LinkPanel, "LinkPanel");
