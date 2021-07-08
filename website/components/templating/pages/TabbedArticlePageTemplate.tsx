import React, { useLayoutEffect, useState } from "react";
import {
  Ingress,
  Title,
  Link,
  Header,
  ContentContainer,
} from "@navikt/ds-react";
import Error from "next/error";

import { useRouter } from "next/router";
import styled from "styled-components";
import { Tab, Tabs } from "../../Tabs";
import { SanityBlockContent } from "../SanityBlockContent";
import LastUpdated from "../../LastUpdated";
import StatusTag from "../../StatusTag";
import FigmaIcon from "../../assets/FigmaIcon";
import GithubIcon from "../../assets/GithubIcon";
import TableOfContents from "../../TableOfContents";
import Heading from "../layout/Heading";
import Sidebar from "../layout/Sidebar";
/* import * as NextLink from "next/link"; */

const Wrapper = styled.div`
  display: flex;
  margin-top: 56px;
  min-height: calc(100vh - 56px);
  @media (max-width: 1068px) {
    display: block;
  }
`;

const MainContent = styled.main`
  flex-direction: column;
  width: 100%;
  position: relative;
  background-color: #f7f7f7;
  background-color: #f9f9f9;
  background-color: #fafafa;
`;

const SanityContent = styled.div`
  position: relative;
  max-width: 1256px;
`;

const MaxW = styled.div`
  max-width: 700px;
  margin: 0;
  margin-right: auto;
  margin-left: var(--navds-spacing-8);
  padding: 0 var(--navds-spacing-8);
  overflow-x: auto;

  @media (max-width: 564px) {
    margin: 0;
    padding-left: var(--navds-spacing-4);
    padding-right: var(--navds-spacing-4);
  }
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
  padding-top: 2rem;
  padding-bottom: var(--navds-spacing-6);
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--navds-spacing-2);
  justify-content: space-between;
`;

const Inline = styled.span`
  display: inline-flex;
  column-gap: var(--navds-spacing-3);
  flex-wrap: wrap;
`;

const TabbedActiclePageTemplate = ({ data, sidebar }) => {
  const { query } = useRouter();

  if (!data.tabs || !data.heading || !data.status) {
    return null;
  }

  const [toc, setToc] = useState([]);

  const basePath = `/designsystem/${(query.slug as string[])
    .slice(0, 2)
    .join("/")}`;

  const tabs: string[] = data.tabs.map(
    (tab) => tab.title?.toLowerCase().replace(/\s+/g, "-") || "undefined"
  );
  const activeTab = query.slug[2] ? tabs.indexOf(query.slug[2]) : 0;

  if (!tabs.includes(query.slug[2]) && query.slug[2]) {
    return <Error statusCode={404} />;
  }

  // TODO: Extract to custom hook?
  useLayoutEffect(() => {
    const tags = document.getElementsByTagName("h2");
    if (!tags) return;
    const toc = [];
    for (let item of tags) {
      toc.push({ heading: item.textContent, id: item.id });
    }
    setToc([...toc]);
  }, [data.body]);

  return (
    <>
      <Heading />
      <Wrapper>
        <Sidebar sidebar={sidebar} />

        <MainContent>
          <MaxW>
            <HeaderWrapper>
              <Title size="2xl" level={1} spacing>
                {data.heading}
              </Title>
              <StatusTag status={data.status} />
            </HeaderWrapper>
          </MaxW>
          {tabs.length > 1 && (
            <Tabs>
              {tabs.map(
                (tab, i) =>
                  data.tabs[i] && (
                    <Tab
                      active={activeTab === i}
                      key={data.tabs[i]._key}
                      path={`${basePath}/${tab}`}
                    >
                      {data.tabs[i].title}
                    </Tab>
                  )
              )}
            </Tabs>
          )}
          <SanityContent>
            <TableOfContents toc={toc} />
            <MaxW>
              <SanityBlockContent
                withMargin
                blocks={data.tabs[activeTab].body}
              />
            </MaxW>
          </SanityContent>
        </MainContent>
      </Wrapper>
    </>
  );
};

export default TabbedActiclePageTemplate;
