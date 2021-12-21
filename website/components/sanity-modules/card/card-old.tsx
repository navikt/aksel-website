import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { useAmplitude, AmplitudeEvents } from "../..";

const ScCard = styled.a`
  min-height: 22rem;
  width: 18rem;
  text-decoration: none;
  color: var(--navds-semantic-color-text);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 3rem 2rem 2rem 2rem;
  border-radius: 4px;
  background-color: var(--navds-semantic-color-canvas-background-light);
  box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
    0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14);
  position: relative;

  transition: background-color 200ms ease-in-out;

  @media (max-width: 564px) {
    padding: 2rem 1rem 1rem 1rem;
  }

  :hover {
    box-shadow: 0 0 0 2px var(--navds-semantic-color-link);

    > .navds-heading {
      text-decoration: none;
      color: var(--navds-semantic-color-link);
    }
  }

  :hover:active {
    > .navds-heading {
      color: var(--navds-semantic-color-text-inverted);
    }
  }

  :focus {
    outline: none;
    color: var(--navds-semantic-color-link);
    > * {
      text-decoration: none;
    }
  }

  :active {
    color: var(--navds-semantic-color-text-inverted);
    border-color: transparent;
    background-color: var(--navds-global-color-blue-700);

    > * {
      color: var(--navds-semantic-color-text-inverted);
    }

    svg > * {
      transition: filter 200ms ease-in-out;
    }
    svg .circle {
      transition: fill 200ms ease-in-out;
    }

    svg > *:not(.circle):not(.parent-circle) {
      filter: invert(1);
    }

    svg > .parent-circle > *:not(.circle) {
      filter: invert(1);
    }

    .circle,
    > * .circle {
      fill: var(--navds-semantic-color-link);
    }
  }

  h2 {
    text-decoration: underline;
  }
`;

const ScPictogram = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 1.5rem;
  flex-shrink: 0;

  svg {
    font-size: 3rem;
  }
`;

const ScContent = styled(BodyShort)`
  margin-bottom: 1.5rem;

  &[data-tag="true"] {
    margin-bottom: 3rem;
  }
`;

const ScTag = styled(Detail)`
  position: absolute;
  bottom: 1.5rem;
  color: var(--navds-semantic-color-text-muted);
`;

const Card = ({
  href,
  pictogram,
  heading,
  content,
  tag,
}: {
  href: string;
  pictogram: React.ReactNode;
  heading: string;
  content: React.ReactNode;
  tag?: string;
}) => {
  const { logAmplitudeEvent } = useAmplitude();

  const { asPath } = useRouter();

  const logNavigation = (e) => {
    logAmplitudeEvent(AmplitudeEvents.navigasjon, {
      kilde: "card",
      fra: asPath,
      til: e.currentTarget.getAttribute("href"),
    });
  };

  return (
    <NextLink passHref href={href}>
      <ScCard onClick={(e) => logNavigation(e)}>
        <ScPictogram>{pictogram}</ScPictogram>
        <Heading size="medium" spacing level="2">
          {heading}
        </Heading>
        <ScContent data-tag={!!tag}>{content}</ScContent>
        {tag && <ScTag size="small">{tag}</ScTag>}
      </ScCard>
    </NextLink>
  );
};

export default Card;
