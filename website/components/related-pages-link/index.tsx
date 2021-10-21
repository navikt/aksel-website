import styled from "styled-components";
import NextLink from "next/link";
import { BodyShort, Heading } from "@navikt/ds-react";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext, LayoutContextProps } from "../templates/layout/Layout";
import { DsNavigationHeadingMenuT } from "../../lib";
import { PagePropsContext } from "../../pages/_app";

const ScWrapper = styled.div<{ context: LayoutContextProps }>`
  width: 100%;
  background-color: var(--navds-color-gray-80);
  padding: 0 1.5rem;

  display: flex;
  justify-content: ${(props) =>
    props.context.isMobile ? "center" : "flex-start"};

  @media (max-width: 564px) {
    padding: 0;
  }
`;

const ScInnerWrapper = styled.div<{ context: LayoutContextProps }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) =>
    props.context.isMobile ? "center" : "flex-start"};
  max-width: 600px;
`;

const ScLink = styled.a`
  color: white;
  text-decoration: none;
  padding: 1rem 1rem;
  height: 7rem;
  flex: 1 1;
  max-width: 400px;
  transition: background-color 200ms;

  :hover {
    background-color: var(--navds-color-gray-60);
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-color-blue-10);
  }
`;

const RelatedPagesLink = () => {
  const [pageProps] = useContext<any>(PagePropsContext);
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
    <ScWrapper context={context}>
      <ScInnerWrapper context={context}>
        {links.prev && (
          <NextLink href={`/${links.prev.link.slug.current}`} passHref>
            <ScLink>
              <BodyShort size="small">Forrige</BodyShort>
              <Heading as="div" size="medium">
                {links.prev.title}
              </Heading>
            </ScLink>
          </NextLink>
        )}
        {links.next && (
          <NextLink href={`/${links.next.link.slug.current}`} passHref>
            <ScLink>
              <BodyShort size="small">Neste</BodyShort>
              <Heading as="div" size="medium">
                {links.next.title}
              </Heading>
            </ScLink>
          </NextLink>
        )}
      </ScInnerWrapper>
    </ScWrapper>
  );
};
export default RelatedPagesLink;
