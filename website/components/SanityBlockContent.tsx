import { BodyLong, Detail, Heading, Ingress, Link } from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
import NextjsLink from "next/link";
import React, { createContext, useContext } from "react";
import styled from "styled-components";
import {
  Alert,
  CodeExample,
  ColorCategory,
  DoDont,
  IconSearch,
  Image,
  ImageWithText,
  LevelTwoHeading,
  LinkPanel,
  PropTable,
  Snippet,
  Spacing,
  RelatedPagesCards,
  Table,
} from ".";
import ComponentOverview from "./component-overview";

export const ScCode = styled.code`
  color: var(--navds-semantic-color-text-default);
  background-color: var(--navds-semantic-color-canvas-background-default);
  border-radius: 2px;
  font-size: 1rem;
  padding: 0 4px;
`;

const ScUl = styled.ul`
  > li {
    max-width: calc(var(--text-max-width) - 1em);
  }
`;

const ScKbd = styled.code`
  display: inline-block;
  margin: 0 var(--navds-spacing-1);
  color: var(--navds-semantic-color-text-default);
  border: 1px solid var(--navds-semantic-color-border-muted);
  border-radius: 3px;
  padding: 0.1rem 0.25rem;
  font-family: var(--font-family-code);
  font-size: 1rem;
`;

const serializers = {
  types: {
    /* Unique page modules */
    ds_component_overview: ({ node }) => <ComponentOverview node={node} />,
    icon_search: () => <IconSearch />,

    /* General page modules */
    related_pages: ({ node }) => <RelatedPagesCards node={node} />,
    code_snippet: ({ node }) => <Snippet node={node} />,
    code_example_ref: ({ node }) => <CodeExample node={node.ref} />,
    color_category_ref: ({ node }) => <ColorCategory node={node.ref} />,
    prop_table: ({ node }) => <PropTable node={node} />,
    do_dont: ({ node }) => <DoDont node={node} />,
    picture: ({ node }) => <Image node={node} />,
    picture_text: ({ node }) => <ImageWithText node={node} />,
    alert: ({ node }) => <Alert node={node} />,
    link_panel: ({ node }) => <LinkPanel node={node} />,
    spacing: ({ node }) => <Spacing node={node} />,
    table: ({ node }) => <Table node={node} />,

    block: ({ node, children }) => {
      const context: BlockContextT = useContext(BlockContext);
      const style = node.style;

      switch (style) {
        case "normal":
          return (
            <>
              {context.isIngress ? (
                <Ingress>{children}</Ingress>
              ) : (
                <BodyLong size={context.size} spacing>
                  {children}
                </BodyLong>
              )}
            </>
          );
        case "detail":
          return (
            <Detail spacing size="small">
              {children}
            </Detail>
          );
        case "h2": {
          return <LevelTwoHeading>{children}</LevelTwoHeading>;
        }
        case "h3":
          return (
            <Heading spacing level="3" size="medium">
              {children}
            </Heading>
          );
        case "heading4":
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
  list: (props: any) => {
    return <ScUl>{props.children}</ScUl>;
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

const ScMarginTop = styled.div`
  :first-child {
    margin-top: 3rem;
  }
`;

export type BlockContextT = {
  size: "medium" | "small";
  isIngress: boolean;
};

export const BlockContext = createContext<BlockContextT>({
  size: "medium",
  isIngress: false,
});

export const SanityBlockContent = ({
  blocks,
  withMargin = false,
  size = "medium",
  isIngress = false,
}: {
  blocks: any;
  withMargin?: boolean;
  size?: "medium" | "small";
  isIngress?: boolean;
}): JSX.Element => {
  return (
    <>
      <BlockContext.Provider value={{ size, isIngress }}>
        {withMargin ? (
          <ScMarginTop>
            <BlockContent
              blocks={blocks}
              serializers={serializers}
              size="small"
            />
          </ScMarginTop>
        ) : (
          <BlockContent
            blocks={blocks}
            serializers={serializers}
            options={{ size: "small" }}
          />
        )}
      </BlockContext.Provider>
    </>
  );
};
