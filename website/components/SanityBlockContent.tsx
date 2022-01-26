import { BodyLong, Detail, Heading, Ingress, Link } from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
import NextLink from "next/link";
import React, { createContext, useContext } from "react";
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
  Sandbox,
  Snippet,
  Spacing,
  RelatedPagesCards,
  Table,
  Tips,
  Accordion,
  ComponentOverview,
  Changelog,
} from ".";

import * as Icons from "@navikt/ds-icons";
import * as Tokens from "@navikt/ds-tokens/dist/tokens";

export const InlineCode = (props: React.HTMLAttributes<HTMLElement>) => (
  <code
    className="text-deepblue-500 bg-deepblue-50 rounded-md py-[2px] px-2 text-medium"
    {...props}
  />
);

export const KBD = (props: React.HTMLAttributes<HTMLElement>) => (
  <code
    className="text-medium py-0 px-2 min-w-[28px] inline-block my-0 mx-1 text-text border border-solid border-gray-800 rounded-sm"
    {...props}
  />
);

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
    changelogs_ref: ({ node }) => <Changelog node={node} />,

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

      const textProps = { children };

      switch (style) {
        case "normal":
          if (context.isIngress) {
            return <Ingress {...textProps} />;
          }
          return <BodyLong size={context.size} spacing {...textProps} />;

        case "detail":
          return <Detail spacing size="small" {...textProps} />;
        case "h2":
          return <LevelTwoHeading {...textProps} />;
        case "h3":
          return (
            <Heading
              className="mt-11"
              spacing
              level="3"
              size="medium"
              {...textProps}
            />
          );
        case "heading4":
          return (
            <Heading
              className="mt-9"
              spacing
              level="4"
              size="small"
              {...textProps}
            />
          );
        case "ingress":
          return <Ingress spacing>{children}</Ingress>;
        default:
          return <BodyLong size={context.size} spacing {...textProps} />;
      }
    },
  },
  list: (props: any) => {
    if (props?.type == "number") {
      return <ol type="1">{props.children}</ol>;
    }
    return <ul>{props.children}</ul>;
  },
  listItem: (props: any) => {
    return (
      <li className="max-w-[calc(var(--text-max-width) - 1em)]">
        {props.children}
      </li>
    );
  },
  marks: {
    draft_only: () => null,
    kbd: (props) => <KBD>{props.children}</KBD>,
    code: (props) => <InlineCode>{props.children}</InlineCode>,
    link: ({ mark: { blank, href }, children }: { mark: any; children: any }) =>
      blank ? (
        <Link href={href} target="_blank" rel="noreferrer noopener">
          {children} (åpner lenken i ny fane)
        </Link>
      ) : (
        <NextLink href={href} passHref>
          <Link>{children}</Link>
        </NextLink>
      ),
    internalLink: ({ mark, children }: { mark: any; children: any }) => {
      const { slug = {} } = mark;
      if (!slug || !slug.current) return children;

      const href = `/${slug?.current}`;
      return (
        <NextLink href={href} passHref>
          <Link>{children}</Link>
        </NextLink>
      );
    },
    ...DsIconAnnotation,
  },
};

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
  size = "medium",
  isIngress = false,
  ...rest
}: {
  blocks: any;
  size?: "medium" | "small";
  isIngress?: boolean;
  className?: string;
}) => (
  <BlockContext.Provider value={{ size, isIngress }}>
    <BlockContent
      blocks={blocks}
      serializers={serializers}
      options={{ size: "small" }}
      renderContainerOnSingleChild
      {...rest}
    />
  </BlockContext.Provider>
);
