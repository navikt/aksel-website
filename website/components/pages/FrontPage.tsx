import {
  ContentContainer,
  Heading,
  LinkPanel,
  BodyLong,
} from "@navikt/ds-react";
import Link from "next/link";
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

const StyledContentContainer = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: calc(
    100% - 2 * var(--navds-content-container-padding-medium-and-larger)
  );
`;

const FrontPage = ({ data }: { data: any }): JSX.Element => {
  return (
    <StyledWrapper>
      <StyledContentContainer>
        <StyledTopContent>
          <Heading level="1" size="xlarge">
            {data.headline}
          </Heading>
        </StyledTopContent>
        {data.panels && (
          <div>
            {data.panels.map((panel) => (
              <Link key={panel.slug + 1} href={"/" + panel.slug} passHref>
                <LinkPanel>
                  <LinkPanel.Title>{panel.title}</LinkPanel.Title>
                  <LinkPanel.Description>{panel.content}</LinkPanel.Description>
                </LinkPanel>
              </Link>
            ))}
          </div>
        )}
      </StyledContentContainer>
    </StyledWrapper>
  );
};

export default FrontPage;
