import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import NextjsLink from "next/link";
import {
  Alert,
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
import Changelog from "../Changelog";
import PropTable from "../Proptable";
import DoDont from "../DoDont";
import UuInteraction from "../UuInteraction";
import Linker from "../Linker";
import Image from "../Image";

const StyledCode = styled.code`
  color: red;
`;

const StyledKbd = styled.code`
  font-family: Consolas, "Lucida Console", monospace;
  display: inline-block;
  border-radius: 3px;
  padding: 0px 4px;
  box-shadow: 1px 1px 1px #777;
  margin: 2px;
  vertical-align: text-bottom;
  background: #eee;
  font-weight: 500;
  color: #555;
  cursor: pointer;
  font-variant: small-caps;
  font-weight: 600;
`;

const StyledAlert = styled(Alert)`
  .navds-typo--spacing {
    margin: 0;
  }
`;

const serializers = {
  types: {
    code_example: Code,
    changelog: Changelog,
    prop_table: PropTable,
    do_dont: DoDont,
    uu_interaction: UuInteraction,
    linker: Linker,
    picture: Image,
    alert: (node) => (
      <StyledAlert variant={node.node.variant}>
        <SanityBlockContent blocks={node.node.body} />
      </StyledAlert>
    ),

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
    kbd: (props) => {
      return <StyledKbd>{props.children}</StyledKbd>;
    },
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
