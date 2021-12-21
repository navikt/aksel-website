import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useAmplitude, AmplitudeEvents } from "../..";
import { DsFrontPageCardT, useSanityImage } from "../../../lib";
import { PagePropsContext } from "../../../pages/_app";
import { withErrorBoundary } from "../../website-features/error-boundary";

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
  box-shadow: var(--navds-shadow-card);
  position: relative;

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

  :focus {
    outline: none;
    box-shadow: var(--navds-shadow-focus);

    > * {
      text-decoration: none;
    }
  }

  :active {
    color: var(--navds-semantic-color-link);
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
  text-transform: uppercase;
`;

const Card = ({
  node,
  tag,
  categoryRef,
}: {
  node: DsFrontPageCardT;
  tag?: boolean;
  categoryRef?: any;
}) => {
  const { logAmplitudeEvent } = useAmplitude();
  const { pageProps } = useContext(PagePropsContext);
  const [category, setCategory] = useState(categoryRef ?? null);
  const imageProps = useSanityImage(category?.picture);
  const { asPath } = useRouter();

  const logNavigation = (e) => {
    logAmplitudeEvent(AmplitudeEvents.navigasjon, {
      kilde: "card",
      fra: asPath,
      til: e.currentTarget.getAttribute("href"),
    });
  };

  useEffect(() => {
    setCategory(categoryRef);
  }, [categoryRef]);

  useEffect(() => {
    if (!pageProps.navigation || !node || !!categoryRef) return;
    const index = pageProps?.navigation?.headings.findIndex((heading) => {
      if (heading?.menu) {
        return (
          heading.menu
            .filter((x) => x._type !== "subheading")
            .find((item) => item.link._id.includes(node.link_ref._id)) ??
          heading.link_ref._id.includes(node.link_ref._id)
        );
      } else {
        return heading.link_ref._id.includes(node.link_ref._id);
      }
    });
    setCategory(pageProps.navigation.headings[index].category_ref);
  }, [pageProps, node, categoryRef]);

  const tagName = category?.title ?? "";

  return (
    <NextLink passHref href={`/${node?.link_ref?.slug}`}>
      <ScCard onClick={(e) => logNavigation(e)}>
        {imageProps && (
          <ScPictogram>
            <NextImage
              {...imageProps}
              alt={category?.picture?.title}
              quality="100"
              layout="fixed"
              aria-hidden
            />
          </ScPictogram>
        )}
        <Heading size="medium" spacing level="2">
          {node.title}
        </Heading>
        <ScContent data-tag={!!tag}>{node.content}</ScContent>
        {tag && <ScTag size="small">{tagName}</ScTag>}
      </ScCard>
    </NextLink>
  );
};

export default withErrorBoundary(Card, "Card");
