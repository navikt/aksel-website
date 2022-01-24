import { Back, Next } from "@navikt/ds-icons";
import { BodyShort, Heading } from "@navikt/ds-react";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LayoutContext, PagePropsContext } from "../..";
import { DsNavigationHeadingMenuT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import NextLink from "next/link";

const ScWrapper = styled.div<{ $isTablet: boolean }>`
  width: 100%;
  margin: 0 auto 7rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;

const ScA = styled.a`
  position: relative;
  color: var(--navds-semantic-color-text);
  border: 1px solid var(--navds-semantic-color-border);
  border-radius: 2px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--navds-semantic-color-component-background-light);
  flex: 1 1 300px;

  > svg {
    flex-shrink: 0;
  }

  &[data-dir="next"]:only-child {
    margin-left: auto;
  }

  :hover {
    box-shadow: var(--navds-shadow-card);
    > *:not(:first-child) {
      text-decoration: underline;
    }

    > svg {
    }
  }

  :focus {
    outline: none;
    box-shadow: var(--navds-shadow-focus);
  }
`;

const ScLeftIcon = styled.span`
  position: absolute;
  left: 0.5rem;
  height: calc(100% - 2rem);
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

const ScRightIcon = styled(ScLeftIcon)`
  right: 0.5rem;
  left: auto;
`;

const ScDummy = styled.div`
  display: flex;
  min-width: 4rem;
  padding: 1rem 2rem;
  flex: 1 1 300px;
`;

const RelatedPagesLink = () => {
  const { pageProps } = useContext<any>(PagePropsContext);
  const context = useContext(LayoutContext);

  const [links, setLinks] = useState<{
    prev?: DsNavigationHeadingMenuT;
    next?: DsNavigationHeadingMenuT;
  }>({});

  useEffect(() => {
    if (
      !context.activeHeading ||
      !context.activeHeading.menu ||
      context.activeHeading.title !== "Komponenter"
    ) {
      setLinks({});
      return;
    }

    const activeIndex = context.activeHeading.menu
      .filter((x) => x._type !== "subheading")
      .findIndex((x) => x.link.slug.current === pageProps?.page?.slug);

    if (activeIndex === -1) {
      setLinks({});
      return;
    }

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

  if (!context.activeHeading || (!links.prev && !links.next)) {
    return null;
  }

  return (
    <ScWrapper $isTablet={context.isTablet}>
      {links.prev ? (
        <NextLink href={`/${links.prev.link.slug.current}`} passHref>
          <ScA aria-label={`Gå til forrige side ${links.prev.title}`}>
            <BodyShort as="div" size="small">
              Forrige
            </BodyShort>
            <Heading size="small" as="div">
              {links.prev.title}
            </Heading>
            <ScLeftIcon>
              <Back aria-hidden />
            </ScLeftIcon>
          </ScA>
        </NextLink>
      ) : (
        <ScDummy aria-hidden />
      )}
      {links.next ? (
        <NextLink href={`/${links.next.link.slug.current}`} passHref>
          <ScA
            data-dir="next"
            aria-label={`Gå til neste side ${links.next.title}`}
          >
            <BodyShort as="div" size="small">
              Neste
            </BodyShort>
            <Heading size="small" as="div">
              {links.next.title}
            </Heading>
            <ScRightIcon>
              <Next aria-hidden />
            </ScRightIcon>
          </ScA>
        </NextLink>
      ) : (
        <ScDummy aria-hidden />
      )}
    </ScWrapper>
  );
};

export default withErrorBoundary(RelatedPagesLink, "RelatedPagesLinks");
