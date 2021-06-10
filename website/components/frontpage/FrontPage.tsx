import { ContentContainer, Title, LinkPanel, BodyLong } from "@navikt/ds-react";
import { SignLanguageTwoHands } from "@navikt/ds-icons";
import styles from "./frontpage.module.css";
import styled from "styled-components";

const StyledWrapper = styled.div`
  background-color: var(--navds-color-background);
  height: 100vh;
`;

const StyledTopContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLinkPanel = styled.div`
  padding: "1rem";
  display: "grid";
  gridautoflow: "column";
  gap: "2rem";
  alignitems: "center";
`;

const StyledContentContainer = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: calc(100% - 2 * var(--navds-content-container-padding-medium-and-larger));
`;

const StyledLinkpanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const FrontPage = ({ ...frontpage }) => {
  return (
    <StyledWrapper>
      <StyledContentContainer>
        <StyledTopContent>
          <Title level={1} size="xl">
            {frontpage.headline}
          </Title>
        </StyledTopContent>
        <StyledLinkpanelWrapper>
          {frontpage.panels.map((panel, i) => (
            <LinkPanel
              key={panel.slug + 1}
              href={panel.slug}
              style={{ textDecoration: "none" }}
            >
              <StyledLinkPanel>
                <SignLanguageTwoHands style={{ fontSize: "5rem" }} />
                <div>
                  {/* <LinkPanelTitle>{panel.title}</LinkPanelTitle> */}
                  <h2>{panel.title}</h2>
                  <BodyLong>{panel.content}</BodyLong>
                </div>
              </StyledLinkPanel>
            </LinkPanel>
          ))}
        </StyledLinkpanelWrapper>
      </StyledContentContainer>
    </StyledWrapper>
  );
};

export default FrontPage;
