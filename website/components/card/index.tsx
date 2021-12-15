import React from "react";
import styled from "styled-components";
import NextLink from "next/link";
import { BodyLong, Detail, Heading } from "@navikt/ds-react";

const ScCard = styled.a`
  height: 22rem;
  max-width: 18rem;
  text-decoration: none;
  color: var(--navds-semantic-color-text);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 3rem 2rem 2rem 2rem;
  border-radius: 4px;
  background-color: var(--navds-semantic-color-canvas-background-light);
  position: relative;
  box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
    0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14);

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
    margin-top: 0.25rem;
    margin-left: 0.25rem;
  }
`;

const ScHeading = styled(Heading)``;
const ScContent = styled(BodyLong)``;
const ScTag = styled(Detail)``;

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
  content: string;
  tag: string;
}) => {
  return (
    <NextLink passHref href={href}>
      <ScCard>
        <ScPictogram>{pictogram}</ScPictogram>
        <ScHeading>{heading}</ScHeading>
        <ScContent>{content}</ScContent>
        <ScTag>{tag}</ScTag>
      </ScCard>
    </NextLink>
  );
};

export default Card;
