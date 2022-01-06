import { BodyShort, Heading } from "@navikt/ds-react";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LayoutContext, PagePropsContext } from "../..";
import { DsNavigationHeadingMenuT } from "../../../lib";
import { withErrorBoundary } from "../error-boundary";

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
    if (!context.activeHeading || !context.activeHeading.menu) return null;

    const activeIndex = context.activeHeading.menu
      .filter((x) => x._type !== "subheading")
      .findIndex((x) => x.link.slug.current === pageProps?.page?.slug);
    if (activeIndex === -1) return null;

    const pages = {
      prev:
        activeIndex === 0
          ? undefined
          : context.activeHeading.menu.filter((x) => x._type !== "subheading")[
              activeIndex - 1
            ],
      next:
        activeIndex === context.activeHeading.menu.length - 1
          ? undefined
          : context.activeHeading.menu.filter((x) => x._type !== "subheading")[
              activeIndex + 1
            ],
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
          <a href={`/${links.prev.link.slug.current}`}>
            <BodyShort size="small">Forrige</BodyShort>
            <Heading as="div" size="medium">
              {links.prev.title}
            </Heading>
          </a>
        )}
        {links.next && (
          <a href={`/${links.next.link.slug.current}`}>
            <BodyShort size="small">Neste</BodyShort>
            <Heading as="div" size="medium">
              {links.next.title}
            </Heading>
          </a>
        )}
      </ScInnerWrapper>
    </ScWrapper>
  );
};

export default withErrorBoundary(RelatedPagesLink, "RelatedPagesLinks");
