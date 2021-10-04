import "@navikt/ds-css";
import {
  Alert,
  BodyLong,
  BodyShort,
  Detail,
  Heading,
  Ingress,
  Label,
  Link,
} from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
import NextjsLink from "next/link";
import React from "react";
import styled from "styled-components";
import {
  CodeExample,
  DoDont,
  Figma,
  Image,
  LevelTwoHeading,
  PropTable,
  Snippet,
  UuInteraction,
} from ".";

export const StyledCode = styled.code`
  color: var(--navds-color-red-50);
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

const StyledAlert = styled(Alert)`
  .navds-typo--spacing {
    margin: 0;
  }
  margin-bottom: var(--navds-spacing-4);
`;

const serializers = {
  types: {
    code_snippet: ({ node }) => <Snippet node={node} />,
    code_example_ref: ({ node }) => <CodeExample node={node.ref} />,
    prop_table: ({ node }) => <PropTable node={node} />,
    do_dont: ({ node }) => <DoDont node={node} />,
    uu_interaction: ({ node }) => <UuInteraction node={node} />,
    picture: ({ node }) => <Image node={node} />,
    figma_embed: ({ node }) => <Figma node={node} />,

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
          return <LevelTwoHeading divider={false}>{children}</LevelTwoHeading>;
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
