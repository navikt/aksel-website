import "@navikt/ds-css";
import { Link as LinkIcon } from "@navikt/ds-icons";
import {
  Alert,
  BodyLong,
  BodyShort,
  Detail,
  Heading,
  Ingress,
  Label,
  Link,
  Popover,
} from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
import copy from "copy-to-clipboard";
import NextjsLink from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Changelog,
  CodeExample,
  DoDont,
  Figma,
  Image,
  PropTable,
  slugger,
  Snippet,
  UuInteraction,
} from ".";

const StyledCode = styled.code`
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
  display: inline-flex;
  align-items: center;
`;

const Anchor = styled.button`
  background-color: transparent;
  border: none;
  display: inline-block;
  margin-left: 0.5rem;
  font-size: 1.25rem;
  height: 48px;
  width: 48px;
  padding: 0.5rem;
  outline: none;
  border-radius: 50%;
  opacity: 0.5;
  transition: opacity 100ms;

  > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--navds-color-blue-80);
  }

  :hover,
  :focus {
    background-color: var(--navds-color-gray-10);
    opacity: 1;
  }

  :active {
    background-color: var(--navds-color-gray-20);
  }
`;

const StyledAlert = styled(Alert)`
  .navds-typo--spacing {
    margin: 0;
  }
  margin-bottom: var(--navds-spacing-4);
`;

const serializers = {
  types: {
    code_snippet: Snippet,
    code_example_ref: CodeExample,
    changelog: Changelog,
    prop_table: PropTable,
    do_dont: DoDont,
    uu_interaction: UuInteraction,
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
          const anchorRef = useRef(null);
          const [openPopover, setOpenPopover] = useState(false);

          const timeoutRef = useRef<NodeJS.Timeout>();

          useEffect(() => {
            if (openPopover) {
              timeoutRef.current = setTimeout(
                () => setOpenPopover(false),
                2000
              );
              return () =>
                timeoutRef.current && clearTimeout(timeoutRef.current);
            }
          }, [openPopover]);

          const slug = slugger.slug(encodeURI(children.toString()));
          const copyAnchor = (id: string): void => {
            setOpenPopover(true);
            const anchor = window.location.href.split("#")[0];
            copy(`${anchor}#${id}`, {
              format: "text/plain",
            });
          };

          return (
            <>
              {children && (
                <Divider>
                  <Hr />
                </Divider>
              )}
              <TitleWithScrollMargin id={slug} spacing level={2} size="large">
                {children}
                <Anchor
                  aria-label={`Kopier lenke til ${children.toString()}`}
                  onClick={() => copyAnchor(slug)}
                  ref={anchorRef}
                >
                  <span>
                    <LinkIcon aria-label="ankerlenke ikon" focusable={false} />
                  </span>
                </Anchor>
              </TitleWithScrollMargin>

              <Popover
                role="alert"
                aria-atomic="true"
                anchorEl={anchorRef.current}
                open={openPopover}
                onClose={() => setOpenPopover(false)}
                placement="right"
                arrow={false}
                offset={8}
              >
                <Popover.Content style={{ padding: "0.25rem" }}>
                  Kopierte lenke
                </Popover.Content>
              </Popover>
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
