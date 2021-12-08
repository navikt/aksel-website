import { BodyShort } from "@navikt/ds-react";
import NextLink from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { SearchContext } from ".";

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

const ScHit = styled.a`
  display: flex;
  padding: 0.75rem;
  padding-right: 0.5rem;
  text-decoration: none;
  color: var(--navds-semantic-color-text);

  :hover {
    background-color: var(--navds-semantic-color-canvas-background);
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-semantic-color-focus);
  }
`;

interface HitProps {
  hit: any;
  onFocus: () => void;
}

const Hit = React.forwardRef<HTMLAnchorElement, HitProps>(
  ({ hit, ...props }: HitProps, ref) => {
    const isArticle = ["artikkel"].includes(hit.page);

    const context = useContext(SearchContext);
    return (
      <BodyShort as="dd">
        <NextLink href={`/${hit.path}`} passHref>
          <ScHit
            onClick={() => context.clicked()}
            {...props}
            tabIndex={-1}
            ref={ref}
          >
            {`${hit.title}${!isArticle ? ` - ${capitalize(hit.page)}` : ""}`}
          </ScHit>
        </NextLink>
      </BodyShort>
    );
  }
);

export default Hit;
