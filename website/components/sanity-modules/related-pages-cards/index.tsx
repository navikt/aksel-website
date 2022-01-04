import { ExternalLink } from "@navikt/ds-icons";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import styled from "styled-components";
import { AmplitudeEvents, useAmplitude } from "../..";
import { RelatedLinkT } from "../../../lib";
import { RelatedPages } from "../../../lib/autogen-types";
import { withErrorBoundary } from "../../website-features/error-boundary";

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

  :hover > :first-child,
  :focus > :first-child {
    color: var(--navds-semantic-color-link);
  }

  :hover {
    border-color: var(--navds-semantic-color-link);
  }

  :focus {
    border-color: var(--navds-semantic-color-focus);
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
  text-transform: uppercase;

  > svg {
    margin-left: var(--navds-spacing-2);
  }
`;

const Card = ({ link }: { link: RelatedLinkT }) => {
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

  const tag =
    (link.tags !== "main_categories" || !link.category_ref
      ? "RELATERT INNHOLD"
      : link?.category_ref?.title) ?? "RELATERT INNHOLD";

  return (
    <ScCard href={href} onClick={(e) => logNavigation(e)}>
      <Heading size="xsmall" as="div">
        {link.title}
      </Heading>
      <ScBodyShort size="small">{link.description}</ScBodyShort>
      <ScDetail>
        {link.internal ? (
          tag
        ) : (
          <>
            EKSTERN LINK <ExternalLink aria-label="Ekstern side" />
          </>
        )}
      </ScDetail>
    </ScCard>
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
        <Card key={x._key} link={x as unknown as RelatedLinkT} />
      ))}
    </ScRelatedPagesCard>
  );
};

export default withErrorBoundary(RelatedPagesCard, "RelatedPagesCard");
