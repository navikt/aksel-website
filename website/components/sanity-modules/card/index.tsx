import { BodyShort, Detail } from "@navikt/ds-react";
import cl from "classnames";
import NextImage from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AmplitudeEvents, PagePropsContext, useAmplitude } from "../..";
import { DsFrontPageCardT, useSanityImage } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";

interface CardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  node: DsFrontPageCardT;
  tag?: boolean;
  categoryRef?: any;
}

const Card = ({
  node,
  tag,
  categoryRef,
  href,
  className,
  ...rest
}: CardProps) => {
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
    <div className={cl("card aspect-[18/22]", className)}>
      {imageProps && (
        <div className="mb-6 flex shrink-0 justify-center">
          <NextImage
            {...imageProps}
            alt={category?.picture?.title}
            quality="100"
            layout="fixed"
            aria-hidden
          />
        </div>
      )}
      <NextLink href={href ?? `/${node?.link_ref?.slug}`} passHref>
        <a
          onClick={(e) => logNavigation(e)}
          className="navds-heading--medium navds-heading navds-typo--spacing after:absolute after:inset-0 focus:outline-none"
          {...rest}
        >
          {node.title}
        </a>
      </NextLink>
      <BodyShort className={cl("mb-6", { "mb-12": !!tag })} data-tag={!!tag}>
        {node.content}
      </BodyShort>
      {tag && (
        <Detail
          size="small"
          className="absolute bottom-6 uppercase text-text-muted"
        >
          {tagName}
        </Detail>
      )}
    </div>
  );
};

export default withErrorBoundary(Card, "Card");
