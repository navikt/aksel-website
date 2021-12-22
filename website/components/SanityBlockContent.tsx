import { BodyLong, Detail, Heading, Ingress, Link } from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
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
  Tips,
  Sandbox,
  Accordion,
  ComponentOverview,
} from ".";

import * as Icons from "@navikt/ds-icons";
import * as Tokens from "@navikt/ds-tokens/dist/tokens";

export const ScCode = styled.code`
  color: var(--navds-global-color-deepblue-500);
  background-color: var(--navds-global-color-deepblue-50);
  border-radius: 6px;
  font-size: 1rem;
  padding: 2px 0.5rem;
`;

const ScOl = styled.ol`
  > li {
    max-width: calc(var(--text-max-width) - 1em);
  }
`;

const ScUl = styled.ul`
  > li {
    max-width: calc(var(--text-max-width) - 1em);
  }
`;

export const ScKbd = styled.code`
  display: inline-block;
  margin: 0 var(--navds-spacing-1);
  color: var(--navds-semantic-color-text);
  border: 1px solid var(--navds-global-color-gray-800);
  border-radius: 2px;
  padding: 0 0.5rem;
  min-width: 28px;
  font-family: var(--font-family-code);
  font-size: 1rem;
`;

const ScHeading = styled(Heading)`
  margin-top: var(--navds-spacing-11);
`;

export const DsIconAnnotation = {
  ds_icon: ({ mark }: { mark: { color?: string; name?: string } }) => {
    if (!mark.name) {
      return null;
    }

    const Ic = Icons?.[mark.name];
    const tokenColor = mark.color ? Tokens[mark.color] : "currentColor";

    return Ic ? <Ic color={tokenColor} aria-hidden /> : null;
  },
};

const serializers = {
  types: {
    /* Unique page modules */
    ds_component_overview: ({ node }) => <ComponentOverview node={node} />,
    icon_search: () => <IconSearch />,

    /* General page modules */
    related_pages: ({ node }) => <RelatedPagesCards node={node} />,
    ds_code_sandbox: ({ node }) => <Sandbox node={node} />,
    code_snippet: ({ node }) => <Snippet node={node} />,
    code_example_ref: ({ node }) => <CodeExample node={node.ref} />,
    color_category_ref: ({ node }) => <ColorCategory node={node.ref} />,
    prop_table: ({ node }) => <PropTable node={node} />,
    do_dont: ({ node }) => <DoDont node={node} />,
    picture: ({ node }) => <Image node={node} />,
    picture_text: ({ node }) => <ImageWithText node={node} />,
    accordion: ({ node }) => <Accordion node={node} />,
    alert: ({ node }) => <Alert node={node} />,
    tips: ({ node }) => <Tips node={node} />,
    link_panel: ({ node }) => <LinkPanel node={node} />,
    spacing: ({ node }) => <Spacing node={node} />,
    table: ({ node }) => <Table node={node} />,

    block: ({ node, children }) => {
      const context: BlockContextT = useContext(BlockContext);
      const style = node.style;
      if (children && children.length === 1 && children[0] === "") return null;

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
            <ScHeading spacing level="3" size="medium">
              {children}
            </ScHeading>
          );
        case "heading4":
          return (
            <ScHeading spacing level="4" size="small">
              {children}
            </ScHeading>
          );
        case "ingress":
          return <Ingress spacing>{children}</Ingress>;
        default:
          return (
            <BodyLong size={context.size} spacing>
              {children}
            </BodyLong>
          );
      }
    },
  },
  list: (props: any) => {
    if (props?.type == "number") {
      return <ScOl type="1">{props.children}</ScOl>;
    }
    return <ScUl>{props.children}</ScUl>;
  },
  marks: {
    draft_only: () => null,
    kbd: (props: any) => <ScKbd>{props.children}</ScKbd>,
    code: (props: any) => <ScCode>{props.children}</ScCode>,
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
      return <Link href={href}>{children}</Link>;
    },
    ...DsIconAnnotation,
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
