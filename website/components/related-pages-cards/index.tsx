import React, { useMemo } from "react";
import styled from "styled-components";
import { RelatedPages } from "../../lib/autogen-types";
import { withErrorBoundary } from "../error-boundary";
import NextLink from "next/link";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { ExternalLink } from "@navikt/ds-icons";
import { AmplitudeEvents, useAmplitude } from "..";
import { useRouter } from "next/router";

const ScRelatedPagesCard = styled.div`
  grid-template-columns: repeat(auto-fit, 15rem);
  align-content: start;
  display: grid;
  gap: var(--navds-spacing-6);
  justify-content: flex-start;
  margin-bottom: var(--navds-spacing-7);
`;

const ScCard = styled.a`
  position: relative;
  height: 100%;
  min-height: 10rem;
  width: 100%;
  background-color: var(--navds-semantic-color-component-light);
  padding: var(--navds-spacing-6);
  box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
    0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(38, 38, 38, 0.14);
  color: var(--navds-semantic-color-text);
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: background-color 200ms ease-in-out, color 200ms ease-in-out;

  :hover > :first-child,
  :focus > :first-child {
    color: var(--navds-semantic-color-text-link);
  }

  :hover,
  :focus {
    border-color: var(--navds-semantic-color-link);
  }

  :active {
    color: var(--navds-semantic-color-text-inverted);
    border-color: transparent;
    background-color: var(--navds-global-color-blue-700);
  }

  :active > *,
  :active > :first-child {
    color: var(--navds-semantic-color-text-inverted);
  }

  > *:first-child {
    margin-bottom: var(--navds-spacing-2);
  }
`;

const ScBodyShort = styled(BodyShort)`
  margin-bottom: var(--navds-spacing-12);
`;

const ScDetail = styled(Detail)`
  color: var(--navds-semantic-color-text-muted);
  position: absolute;
  bottom: var(--navds-spacing-6);

  > svg {
    margin-left: var(--navds-spacing-2);
  }
`;

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
  const { logAmplitudeEvent } = useAmplitude();

  const { asPath } = useRouter();

  const logNavigation = (e) => {
    logAmplitudeEvent(AmplitudeEvents.navigasjon, {
      kilde: "related-pages-card",
      fra: asPath,
      til: e.currentTarget.getAttribute("href"),
    });
  };
  const href = link.internal ? `/${link.internal_link}` : link.external_link;

  return (
    <NextLink href={href} passHref>
      <ScCard onClick={(e) => logNavigation(e)}>
        <Heading size="xsmall" as="div">
          {link.title}
        </Heading>
        <ScBodyShort size="small">{link.description}</ScBodyShort>
        <ScDetail>
          {link.internal ? (
            "RELATERT INNHOLD"
          ) : (
            <>
              EKSTERN LINK <ExternalLink aria-label="Ekstern side" />
            </>
          )}
        </ScDetail>
      </ScCard>
    </NextLink>
  );
};

const RelatedPagesCard = ({ node }: { node: RelatedPages }): JSX.Element => {
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
