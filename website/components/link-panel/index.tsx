import { LinkPanel as DsLinkPanel } from "@navikt/ds-react";
import React from "react";
import Link from "next/link";
import { LinkPanel as LinkPanelT } from "../../lib/autogen-types";

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

  return (
    <Link href={link} passHref>
      <DsLinkPanel>
        <DsLinkPanel.Title as={node.heading_level}>
          {node.heading}
        </DsLinkPanel.Title>
        {node.body && (
          <DsLinkPanel.Description>{node.body}</DsLinkPanel.Description>
        )}
      </DsLinkPanel>
    </Link>
  );
};

export default LinkPanel;
