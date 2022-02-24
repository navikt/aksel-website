import { Back, Next } from "@navikt/ds-icons";
import { BodyShort, Heading } from "@navikt/ds-react";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext, PagePropsContext } from "../..";
import { DsNavigationHeadingMenuT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import NextLink from "next/link";

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
    <div className="mx-auto mt-0 mb-28 flex w-full flex-wrap justify-between gap-4">
      {links.prev ? (
        <NextLink href={`/${links.prev.link.slug.current}`} passHref>
          <a className="group relative flex flex-1 basis-72 flex-col items-center rounded-sm border border-border bg-white py-4 px-8 text-text no-underline only:ml-auto hover:shadow-card focus:shadow-focus focus:outline-none">
            <BodyShort as="div" size="small">
              Forrige
            </BodyShort>
            <Heading size="small" as="div" className="group-hover:underline">
              {links.prev.title}
            </Heading>
            <span className="absolute left-2 flex h-[calc(100%_-_2rem)] items-center text-2xl">
              <Back aria-hidden className="shrink-0" />
            </span>
          </a>
        </NextLink>
      ) : (
        <span
          aria-hidden
          className="flex min-w-header flex-1 basis-72 py-4 px-8"
        />
      )}
      {links.next ? (
        <NextLink href={`/${links.next.link.slug.current}`} passHref>
          <a className="group relative flex flex-1 basis-72 flex-col items-center rounded-sm border border-border bg-white py-4 px-8 text-text no-underline only:ml-auto hover:shadow-card focus:shadow-focus focus:outline-none">
            <BodyShort as="div" size="small">
              Neste
            </BodyShort>
            <Heading size="small" as="div" className="group-hover:underline">
              {links.next.title}
            </Heading>
            <span className="absolute right-2 left-auto flex h-[calc(100%_-_2rem)] items-center text-2xl">
              <Next aria-hidden className="shrink-0" />
            </span>
          </a>
        </NextLink>
      ) : (
        <span
          aria-hidden
          className="flex min-w-header flex-1 basis-72 py-4 px-8"
        />
      )}
    </div>
  );
};

export default withErrorBoundary(RelatedPagesLink, "RelatedPagesLinks");
