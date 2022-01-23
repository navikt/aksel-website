import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AmplitudeEvents, PagePropsContext, useAmplitude } from "../..";
import { DsFrontPageCardT, useSanityImage } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import cl from "classnames";

const Card = ({
  node,
  tag,
  categoryRef,
  href,
}: {
  node: DsFrontPageCardT;
  tag?: boolean;
  categoryRef?: any;
  href?: string;
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
    if (index === -1) {
      return;
    }
    setCategory(pageProps.navigation.headings[index].category_ref);
  }, [pageProps, node, categoryRef]);

  const tagName = category?.title ?? "";

  if (!category) {
    return null;
  }

  return (
    <a
      onClick={(e) => logNavigation(e)}
      href={href ?? `/${node?.link_ref?.slug}`}
      className="card aspect-[18/22] hover:-translate-y-1 transition-transform"
    >
      {imageProps && (
        <div className="flex justify-center mb-6 shrink-0">
          <NextImage
            {...imageProps}
            alt={category?.picture?.title}
            quality="100"
            layout="fixed"
            aria-hidden
          />
        </div>
      )}
      <Heading size="medium" spacing level="2">
        {node.title}
      </Heading>
      <BodyShort className={cl("mb-6", { "mb-12": !!tag })} data-tag={!!tag}>
        {node.content}
      </BodyShort>
      {tag && (
        <Detail
          size="small"
          className="absolute bottom-6 text-text-muted uppercase"
        >
          {tagName}
        </Detail>
      )}
    </a>
  );
};

export default withErrorBoundary(Card, "Card");
