import { BodyShort, Label } from "@navikt/ds-react";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LayoutContext, PagePropsContext } from "../..";
import { DsNavigationHeadingMenuT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";

const ScWrapper = styled.div<{ $isTablet: boolean }>`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 0.5rem;

  > * {
    color: var(--navds-semantic-color-text);
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 4rem;
    padding: 0.5rem;

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
    }
    :focus {
      outline: none;
      box-shadow: var(--navds-shadow-focus);
      > *:not(:first-child) {
      }
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
      {links.prev && (
        <a
          href={`/${links.prev.link.slug.current}`}
          aria-label={`Gå til forrige side ${links.prev.title}`}
        >
          <BodyShort as="div" size="small">
            Forrige
          </BodyShort>
          <Label as="div">{links.prev.title}</Label>
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
          <Label as="div">{links.next.title}</Label>
        </a>
      )}
    </ScWrapper>
  );
};

export default withErrorBoundary(RelatedPagesLink, "RelatedPagesLinks");
