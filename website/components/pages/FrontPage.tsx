import { ContentContainer, Title, LinkPanel, BodyLong } from "@navikt/ds-react";
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
          <Title level={1} size="xl">
            {data.headline}
          </Title>
        </StyledTopContent>
        {data.panels && (
          <div>
            {data.panels.map((panel) => (
              <Link key={panel.slug + 1} href={"/" + panel.slug} passHref>
                <LinkPanel>
                  <h2>{panel.title}</h2>
                  <BodyLong>{panel.content}</BodyLong>
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
