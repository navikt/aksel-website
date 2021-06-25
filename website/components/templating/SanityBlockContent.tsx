import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import NextjsLink from "next/link";
import {
  BodyLong,
  BodyShort,
  Detail,
  Ingress,
  Label,
  Link,
  Title,
} from "@navikt/ds-react";
import "@navikt/ds-css";
import Code from "../code/Code";
import styled from "styled-components";
import slugger from "../slugger";

const StyledCode = styled.code`
  color: red;
`;

const serializers = {
  types: {
    code_example: Code,

    block: ({ node, children, ...rest }) => {
      const style = node.style;

      switch (style) {
        case "normal":
          return <BodyLong spacing>{children}</BodyLong>;
        case "bodylong":
          return <BodyLong spacing>{children}</BodyLong>;
        case "bodyshort":
          return <BodyShort spacing>{children}</BodyShort>;
        case "detailbold":
          return <Detail spacing>{children}</Detail>;
        case "detail":
          return (
            <Detail spacing size="s">
              {children}
            </Detail>
          );
        case "label":
          return <Label spacing>{children}</Label>;
        case "h2": {
          return (
            <Title
              spacing
              level={2}
              size="xl"
              id={slugger.slug(children.toString())}
            >
              {children}
            </Title>
          );
        }
        case "h3":
          return (
            <Title spacing level={3} size="l">
              {children}
            </Title>
          );
        case "h4":
          return (
            <Title spacing level={4} size="m">
              {children}
            </Title>
          );
        case "ingress":
          return <Ingress spacing>{children}</Ingress>;
        case "normal":
          return <BodyLong spacing>{children}</BodyLong>;
        default:
          return children;
      }
    },
  },
  marks: {
    code: (props) => {
      return <StyledCode>{props.children}</StyledCode>;
    },
    link: ({ mark, children }) => {
      const { blank, href } = mark;

      return blank ? (
        <Link href={href} target="_blank" rel="noreferrer noopener">
          {children}
        </Link>
      ) : (
        <Link href={href}>{children}</Link>
      );
    },
    // TODO: Run a query on _ref (id) if is not part of "mark"
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark;
      const href = `/${slug.current}`;
      !slug && console.log("Intern ref har ikke slug i block.");
      return (
        <NextjsLink href={href} passHref>
          <Link href="">{children}</Link>
        </NextjsLink>
      );
    },
  },
};

export const SanityBlockContent = (props: { blocks: any }) => {
  return <BlockContent blocks={props.blocks} serializers={serializers} />;
};
