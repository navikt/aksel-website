import React from "react";
import { Ingress, Title, Link, Header } from "@navikt/ds-react";

import { useRouter } from "next/router";
import styled from "styled-components";
import { Tab, Tabs } from "../../Tabs";
import { SanityBlockContent } from "../SanityBlockContent";
import LastUpdated from "../../LastUpdated";
import StatusTag from "../../StatusTag";
import FigmaIcon from "../../assets/FigmaIcon";
import GithubIcon from "../../assets/GithubIcon";
/* import * as NextLink from "next/link"; */

const Div = styled.div`
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const Links = styled.div`
  display: flex;
  column-gap: 1rem;
  margin-left: var(--navds-spacing-4);
  a {
    text-decoration: none;
    color: var(--navds-color-darkgray);
    :hover {
      text-decoration: underline;
    }
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--navds-spacing-2);
  justify-content: space-between;
`;

const ComponentPageTemplate = ({ data }) => {
  const { query } = useRouter();
  /*   console.log(data); */

  const basePath = `/designsystem/${(query.slug as string[])
    .slice(0, 2)
    .join("/")}`;

  const tabs = {
    bruk: "usage",
    utvikling: "development",
    design: "design",
    tilgjengelighet: "accessibility",
  };

  const activeTab = query.slug[2] ?? "bruk";

  return (
    <Div>
      <HeaderWrapper>
        <Title size="2xl" level={1} spacing>
          {data.heading}
        </Title>
        <StyledDiv>
          <StatusTag status={data.status} />
          <Links>
            {data.npm_link && <Link href={data.npm_link}>NPM</Link>}
            <Link href={data.github_link}>
              Github <GithubIcon />
            </Link>
            <Link href={data.figma_link}>
              Figma <FigmaIcon />
            </Link>
          </Links>
        </StyledDiv>
        <LastUpdated date={data._updatedAt} />
      </HeaderWrapper>

      <Ingress spacing>{data.ingress}</Ingress>

      <Tabs>
        {Object.entries(tabs).map(
          ([key, value]) =>
            data[value] && (
              <Tab
                key={key}
                path={`${basePath}${key === "bruk" ? "" : "/" + key}`}
              >
                {key}
              </Tab>
            )
        )}
      </Tabs>
      <SanityBlockContent blocks={data[tabs[activeTab]]} />
    </Div>
  );
};

export default ComponentPageTemplate;
