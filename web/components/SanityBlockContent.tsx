import React, { useContext } from "react";
import BlockContent from "@sanity/block-content-to-react";
import { BodyLong, Ingress, Title } from "@navikt/ds-react";
import { defaultClient as config } from "../client";

const serializers = {
  types: {
    /* veilederPanel: function renderVeilederPanel({node}) {
          return (
              <StyledVeilederPanel>
                  <Veilederpanel
                      type="plakat"
                      kompakt
                      fargetema="suksess"
                      svg={<img src={urlFor(node.icon).url()} alt="" />}
                  >
                      <Undertittel>{node.title}</Undertittel>
                      <SanityBlockContent blocks={node.body} />
                  </Veilederpanel>
              </StyledVeilederPanel>
          );
      }, */

    block: function renderBlock({ node, children }) {
      const style = node.style;
      if (style === "normal") {
        return <BodyLong spacing>{children}</BodyLong>;
      }
      if (style === "bodylong") {
        return <BodyLong spacing>{children}</BodyLong>;
      }
      if (style === "h2") {
        return (
          <Title spacing level={2} size="xl">
            {children}
          </Title>
        );
      }
      if (style === "h3") {
        return (
          <Title spacing level={3} size="l">
            {children}
          </Title>
        );
      }
      if (style === "ingress") {
        return <Ingress spacing>{children}</Ingress>;
      }

      return children;
    },
  },
  /* marks: {
      link: function renderLink({mark, children}) {
          const {blank, href} = mark;

          return blank ? (
              <Lenke href={href} target="_blank" rel="noreferrer noopener">
                  {children}
              </Lenke>
          ) : (
              <Lenke href={href}>{children}</Lenke>
          );
      },
      internalLink: function renderInternalLink({mark, children}) {
          const {slug = {}} = mark;
          const href = `/${slug.current}`;
          return (
              <Link href={href}>
                  <a className="lenke">{children}</a>
              </Link>
          );
      },
      interpolate: function renderInterpolate({mark}) {
          const context = useContext(SanityContext);
          const {prop} = mark;

          const value = context[prop];

          return <>{value}</>;
      },
  }, */
};

export const SanityBlockContent = (props: { blocks: any }) => {
  return <BlockContent blocks={props.blocks} serializers={serializers} {...config} />;
};
