import "@navikt/ds-css";
import {
  Alert,
  BodyLong,
  BodyShort,
  Detail,
  Ingress,
  Label,
  Link,
  Heading,
} from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
import NextjsLink from "next/link";
import React from "react";
import styled from "styled-components";
import Changelog from "../Changelog";
import Code from "../code/Code";
import ParseCodeRef from "../code/ParseCodeRef";
import DoDont from "../DoDont";
import Figma from "../Figma";
import Image from "../Image";
import Linker from "../Linker";
import PropTable from "../Proptable";
import slugger from "../slugger";
import UuInteraction from "../UuInteraction";

const StyledCode = styled.code`
  color: red;
`;

const StyledKbd = styled.code`
  display: inline-block;
  margin: 0 var(--navds-spacing-1);
  color: var(--navds-color-darkgray);
  border: 1px solid var(--navds-color-gray-40);
  border-radius: 3px;
  padding: 0.1rem 0.25rem;
  font-family: var(--font-family-code);
  font-size: 1rem;
`;

const Divider = styled.div`
  padding: 0 6rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
  :first-child {
    display: none;
  }
`;

const Hr = styled.hr`
  border: 1px solid rgb(201, 201, 201, 0.4);
  margin: 0;
`;

const TitleWithScrollMargin = styled(Heading)`
  scroll-margin-top: 5rem;
`;

const StyledAlert = styled(Alert)`
  .navds-typo--spacing {
    margin: 0;
  }
  margin-bottom: var(--navds-spacing-4);
`;

const serializers = {
  types: {
    code_example_ref: ParseCodeRef,
    code_example: Code,
    changelog: Changelog,
    prop_table: PropTable,
    do_dont: DoDont,
    uu_interaction: UuInteraction,
    linker: Linker,
    picture: Image,
    figma_embed: Figma,
    alert: (node) => (
      <StyledAlert variant={node.node.variant}>
        <SanityBlockContent blocks={node.node.body} />
      </StyledAlert>
    ),

    block: ({ node, children }) => {
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
            <Detail spacing size="small">
              {children}
            </Detail>
          );
        case "label":
          return <Label spacing>{children}</Label>;
        case "h2": {
          const slug = slugger.slug(children.toString());
          return (
            <>
              <Divider>
                <Hr />
              </Divider>
              <TitleWithScrollMargin id={slug} spacing level={2} size="large">
                {children}
              </TitleWithScrollMargin>
            </>
          );
        }
        case "h3":
          return (
            <Heading spacing level="3" size="medium">
              {children}
            </Heading>
          );
        case "h4":
          return (
            <Heading spacing level="4" size="medium">
              {children}
            </Heading>
          );
        case "ingress":
          return <Ingress spacing>{children}</Ingress>;
        default:
          return children;
      }
    },
  },
  marks: {
    kbd: (props: any) => {
      return <StyledKbd>{props.children}</StyledKbd>;
    },
    code: (props: any) => {
      return <StyledCode>{props.children}</StyledCode>;
    },
    link: ({ mark, children }: { mark: any; children: any }) => {
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
    internalLink: ({ mark, children }: { mark: any; children: any }) => {
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

const MarginTopDiv = styled.div`
  margin-top: 4rem;
`;

export const SanityBlockContent = ({
  blocks,
  withMargin = false,
}: {
  blocks: any;
  withMargin?: boolean;
}): JSX.Element => {
  return (
    <>
      {withMargin ? (
        <MarginTopDiv>
          <BlockContent blocks={blocks} serializers={serializers} />
        </MarginTopDiv>
      ) : (
        <BlockContent blocks={blocks} serializers={serializers} />
      )}
    </>
  );
};
