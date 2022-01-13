import { Back, Next } from "@navikt/ds-icons";
import { BodyShort, Heading } from "@navikt/ds-react";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LayoutContext, PagePropsContext } from "../..";
import { DsNavigationHeadingMenuT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";

const ScWrapper = styled.div<{ $isTablet: boolean }>`
  width: 100%;
  margin: 0 auto 7rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;

  > * {
    position: relative;
    color: var(--navds-semantic-color-text-inverted);
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 4rem;
    padding: 0.5rem 2rem;
    background-color: var(--navds-global-color-gray-800);
    flex: 1 1 200px;

    > svg {
      flex-shrink: 0;
    }

    &[data-dir="next"]:only-child {
      margin-left: auto;
    }

    :hover {
      > *:not(:first-child) {
        text-decoration: underline;
      }

      > svg {
      }
    }
    :focus {
      outline: none;
      box-shadow: 0 0 0 1px white, 0 0 0 4px var(--navds-semantic-color-focus);
    }
  }
`;

const ScLeftIcon = styled.span`
  position: absolute;
  left: 0.5rem;
  height: calc(100% - 1rem);
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

const ScRightIcon = styled(ScLeftIcon)`
  right: 0.5rem;
  left: auto;
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
    )
      return null;

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
      {links.prev && (
        <a
          href={`/${links.prev.link.slug.current}`}
          aria-label={`Gå til forrige side ${links.prev.title}`}
        >
          <BodyShort as="div" size="small">
            Forrige
          </BodyShort>
          <Heading size="small" as="div">
            {links.prev.title}
          </Heading>
          <ScLeftIcon>
            <Back aria-hidden />
          </ScLeftIcon>
        </a>
      )}
      {links.next && (
        <a
          href={`/${links.next.link.slug.current}`}
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
        </a>
      )}
    </ScWrapper>
  );
};

export default withErrorBoundary(RelatedPagesLink, "RelatedPagesLinks");
