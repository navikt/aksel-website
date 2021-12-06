import { BodyShort, Detail, Link } from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
import NextjsLink from "next/link";
import React from "react";
import { ScKbd, ScCode } from "../SanityBlockContent";

const serializers = {
  types: {
    block: ({ node, children }) => {
      const style = node.style;

      switch (style) {
        case "normal":
          return <BodyShort as="span">{children}</BodyShort>;
        case "detail":
          return (
            <Detail size="small" as="span">
              {children}
            </Detail>
          );
        default:
          return children;
      }
    },
  },
  marks: {
    kbd: (props: any) => <ScKbd>{props.children}</ScKbd>,
    code: (props: any) => <ScCode>{props.children}</ScCode>,
    link: ({ mark: { blank, href }, children }: { mark: any; children: any }) =>
      blank ? (
        <NextjsLink href={href} passHref>
          <Link target="_blank" rel="noreferrer noopener">
            {children} (åpner lenken i ny fane)
          </Link>
        </NextjsLink>
      ) : (
        <NextjsLink href={href} passHref>
          <Link>{children}</Link>
        </NextjsLink>
      ),
    internalLink: ({ mark, children }: { mark: any; children: any }) => {
      const { slug = {} } = mark;
      if (!slug || !slug.current) return children;

      const href = `/${slug?.current}`;
      return (
        <NextjsLink href={href} passHref>
          <Link>{children}</Link>
        </NextjsLink>
      );
    },
  },
};

export const TableBlockContent = ({ blocks }: { blocks: any }): JSX.Element => {
  return (
    <>
      <BlockContent blocks={blocks} serializers={serializers} />
    </>
  );
};
