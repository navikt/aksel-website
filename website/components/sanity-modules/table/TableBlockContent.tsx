import { BodyShort, Detail, Link } from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
import NextLink from "next/link";
import React from "react";
import { DsIconAnnotation, InlineCode, KBD } from "../../SanityBlockContent";

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
    kbd: (props: any) => <KBD>{props.children}</KBD>,
    code: (props: any) => <InlineCode>{props.children}</InlineCode>,
    link: ({ mark: { blank, href }, children }: { mark: any; children: any }) =>
      blank ? (
        <Link href={href} target="_blank" rel="noreferrer noopener">
          {children} (åpner lenken i ny fane)
        </Link>
      ) : (
        <Link href={href}>{children}</Link>
      ),
    internalLink: ({ mark, children }: { mark: any; children: any }) => {
      const { slug = {} } = mark;
      if (!slug || !slug.current) return children;

      const href = `/${slug?.current}`;
      return (
        <NextLink href={href} passHref>
          <Link href={href}>{children}</Link>;
        </NextLink>
      );
    },
    ...DsIconAnnotation,
  },
};

export const TableBlockContent = ({ blocks }: { blocks: any }): JSX.Element => {
  return (
    <div className="table-icon">
      <BlockContent blocks={blocks} serializers={serializers} />
    </div>
  );
};
