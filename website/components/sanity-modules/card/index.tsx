import { BodyShort, Detail } from "@navikt/ds-react";
import cl from "classnames";
import NextImage from "next/image";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { logNav, useDsNavigation } from "../..";
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
  const [nav] = useDsNavigation();
  const [category, setCategory] = useState(categoryRef ?? null);
  const imageProps = useSanityImage(category?.picture);

  useEffect(() => {
    setCategory(categoryRef);
  }, [categoryRef]);

  useEffect(() => {
    if (!nav || !node || !!categoryRef) return;
    const index = nav?.headings.findIndex((heading) => {
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
    setCategory(nav.headings[index].category_ref);
  }, [nav, node, categoryRef]);

  const tagName = category?.title ?? "";

  if (!category) {
    return null;
  }

  return (
    <div className={cl("card group aspect-[18/22]", className)}>
      {imageProps && (
        <div className="mb-6 flex shrink-0 justify-center">
          <NextImage
            {...imageProps}
            alt={category?.picture?.title}
            quality="100"
            layout="fixed"
            aria-hidden
            unoptimized
            priority
          />
        </div>
      )}
      <NextLink href={href ?? `/${node?.link_ref?.slug}`} passHref>
        <a
          onClick={(e) =>
            logNav(
              "card",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
          className="navds-heading--medium navds-heading navds-typo--spacing underline after:absolute after:inset-0 focus:outline-none group-hover:no-underline"
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
