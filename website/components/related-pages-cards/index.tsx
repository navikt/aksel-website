import React, { useMemo } from "react";
import styled from "styled-components";
import { RelatedPages } from "../../lib/autogen-types";
import { withErrorBoundary } from "../error-boundary";
import NextLink from "next/link";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { ExternalLink } from "@navikt/ds-icons";

const ScRelatedPagesCard = styled.div``;
const ScCard = styled.a``;
const ScDetail = styled(Detail)``;

/* Query changes internal_link type  */
interface LinkT {
  _type: "link";
  title?: string;
  description?: string;
  internal?: boolean;
  internal_link?: string;
  external_link?: string;
}

const Card = ({ link }: { link: LinkT }) => {
  const href = link.internal ? `/${link.internal_link}` : link.external_link;
  return (
    <NextLink href={href} passHref>
      <ScCard>
        <Heading size="xsmall" as="span">
          {link.title}
        </Heading>
        <BodyShort size="small">{link.description}</BodyShort>
        <ScDetail>
          {link.internal
            ? "RELATERT INNHOLD"
            : `EKSTERN LINK ${(<ExternalLink aria-label="Ekstern side" />)}`}
        </ScDetail>
      </ScCard>
    </NextLink>
  );
};

const RelatedPagesCard = ({ node }: { node: RelatedPages }): JSX.Element => {
  console.log(node);

  if (!node || node?.links.length === 0) {
    return null;
  }

  const links = useMemo(
    () => node.links.filter((x) => x.external_link || x.internal_link),
    [node.links]
  );

  return (
    <ScRelatedPagesCard>
      {links.map((x) => (
        <Card key={x._key} link={x as unknown as LinkT} />
      ))}
    </ScRelatedPagesCard>
  );
};

export default withErrorBoundary(RelatedPagesCard, "RelatedPagesCard");
