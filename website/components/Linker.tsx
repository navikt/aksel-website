import { LinkPanel } from "@navikt/ds-react";
import "nav-frontend-tabell-style/dist/main.css";
import React from "react";
import styled from "styled-components";

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

const Linker = ({ node }: { node: any }): JSX.Element => {
  /* console.log(node); */
  return (
    <Div>
      {node.linker_links.map((link) => {
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
                <LinkPanel.Title className="navds-heading--small">
                  {link.title}
                </LinkPanel.Title>
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
