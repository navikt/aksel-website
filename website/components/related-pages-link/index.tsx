import styled from "styled-components";
import NextLink from "next/link";
import { BodyShort, Heading } from "@navikt/ds-react";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "..";
import { DsNavigationHeadingMenuT } from "../../lib";
import { PagePropsContext } from "../../pages/_app";

const ScWrapper = styled.div<{ $isTablet: boolean }>`
  width: 100%;
  background-color: var(--navds-global-color-gray-800);
  padding: 0 0;

  display: flex;
  justify-content: ${(props) => (props.$isTablet ? "center" : "flex-start")};

  @media (max-width: 564px) {
    padding: 0;
  }
`;

const ScInnerWrapper = styled.div<{ $isTablet: boolean }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.$isTablet ? "center" : "flex-start")};
  max-width: 648px;

  > * {
    color: var(--navds-semantic-color-text-inverted);
    text-decoration: none;
    padding: 1rem 3rem;
    height: 7rem;
    flex: 1 1;
    max-width: 400px;
    transition: background-color 200ms;
    padding: ${(props) => (props.$isTablet ? "1rem 1.5rem" : "1rem 3rem")};

    @media (max-width: 564px) {
      padding: 1rem;
    }

    :hover {
      background-color: var(--navds-global-color-gray-600);
    }

    :focus {
      outline: none;
      box-shadow: inset 0 0 0 3px var(--navds-global-color-blue-200);
    }
  }
`;

const RelatedPagesLink = () => {
  const { pageProps } = useContext<any>(PagePropsContext);
  const context = useContext(LayoutContext);

  const [links, setLinks] = useState<{
    prev?: DsNavigationHeadingMenuT;
    next?: DsNavigationHeadingMenuT;
  }>({});

  useEffect(() => {
    if (!context.activeHeading) return null;

    const activeIndex = context.activeHeading.menu.findIndex(
      (x) => x.link.slug.current === pageProps?.page?.slug
    );
    if (activeIndex === -1) return null;

    const pages = {
      prev:
        activeIndex === 0
          ? undefined
          : context.activeHeading.menu[activeIndex - 1],
      next:
        activeIndex === context.activeHeading.menu.length - 1
          ? undefined
          : context.activeHeading.menu[activeIndex + 1],
    };
    setLinks(pages);
  }, [pageProps, context.activeHeading]);

  if (!context.activeHeading) {
    return null;
  }

  return (
    <ScWrapper $isTablet={context.isTablet}>
      <ScInnerWrapper $isTablet={context.isTablet}>
        {links.prev && (
          <NextLink href={`/${links.prev.link.slug.current}`} passHref>
            <a>
              <BodyShort size="small">Forrige</BodyShort>
              <Heading as="div" size="medium">
                {links.prev.title}
              </Heading>
            </a>
          </NextLink>
        )}
        {links.next && (
          <NextLink href={`/${links.next.link.slug.current}`} passHref>
            <a>
              <BodyShort size="small">Neste</BodyShort>
              <Heading as="div" size="medium">
                {links.next.title}
              </Heading>
            </a>
          </NextLink>
        )}
      </ScInnerWrapper>
    </ScWrapper>
  );
};
export default RelatedPagesLink;
