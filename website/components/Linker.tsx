import { Divide } from "@navikt/ds-icons";
import {
  Label,
  Link,
  LinkPanel,
  LinkPanelTitle,
  Title,
} from "@navikt/ds-react";
import styled from "styled-components";
import { SanityBlockContent } from "./templating/SanityBlockContent";
import "nav-frontend-tabell-style/dist/main.css";
import React from "react";

const Div = styled.div`
  margin-bottom: var(--navds-spacing-8);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StyledLinkPanel = styled(LinkPanel)`
  max-width: 330px;
`;

const LinkBox = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
`;

const Linker = ({ node }) => {
  console.log(node);
  return (
    <Div>
      {node.linker_links.map((link) => {
        console.log(link);
        const props = link.link_url_external
          ? {
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {};
        return (
          <StyledLinkPanel key={link._key} href={link.link_url} {...props}>
            <LinkBox>
              <div>
                <LinkPanelTitle className="navds-title--s">
                  {link.title}
                </LinkPanelTitle>
                {link.text && (
                  <div className="navds-body-short">{link.text}</div>
                )}
              </div>
            </LinkBox>
          </StyledLinkPanel>
        );
      })}
    </Div>
  );
};

export default Linker;
