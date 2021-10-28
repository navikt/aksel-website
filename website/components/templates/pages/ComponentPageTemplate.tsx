import { ExternalLink } from "@navikt/ds-icons";
import { Heading, Ingress, Link } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React from "react";
import { useMedia } from "react-use";
import styled from "styled-components";
import {
  Changelog,
  LastUpdateTag,
  LevelTwoHeading,
  Snippet,
  StatusTag,
  Tab,
  TableOfContents,
  Tabs,
} from "../..";
import {
  CodeSnippet,
  DsChangelog,
  DsComponentPage,
} from "../../../lib/autogen-types";
import { SanityBlockContent } from "../../SanityBlockContent";
import * as S from "./page.styles";

const Links = styled.div`
  display: flex;
  column-gap: 0.25rem;
  font-size: 1.25rem;
  margin-left: var(--navds-spacing-4);
  right: 0;
  top: 0;

  a {
    text-decoration: none;
    color: var(--navds-color-darkgray);
    padding: 0.75rem;
    transition: box-shadow 100ms;
    justify-content: center;
    display: flex;
    gap: 0.25rem;

    :hover {
      text-decoration: underline;
      background: var(--navds-color-blue-10);
    }

    :focus {
      outline: none;
      box-shadow: 0 0 0 3px var(--navds-color-blue-80);
    }

    :active {
      background-color: var(--navds-color-blue-80);
      color: white;
    }
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--navds-spacing-2);
  justify-content: space-between;
`;

const MarginTop = styled.div`
  margin-top: 3rem;
`;

const ComponentPageTemplate = ({
  data,
  changelogs,
}: {
  data: DsComponentPage;
  changelogs: DsChangelog[];
}): JSX.Element => {
  const { query } = useRouter();
  const changeTab = useMedia("(max-width: 564px)");

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

  const installSnippet: CodeSnippet = {
    _type: "code_snippet",
    title: `Install-snippet for ${data.heading}`,
    code: {
      language: "bash",
      code: `yarn install ${((data as any)?.linked_packages)
        .map((x) => x.title)
        .join(" ")}`,
    },
  };

  return (
    <>
      <S.MaxWidthContainer>
        <S.HeadingContainer>
          <Heading size="2xlarge" level="1" spacing>
            {data.heading}
          </Heading>
          <StyledDiv>
            <S.Inline>
              <StatusTag status={data.status} />
              <LastUpdateTag date={data?.metadata?.last_update} />
            </S.Inline>
            <Links>
              {data.npm_link && (
                <a href={data.npm_link}>
                  NPM
                  <ExternalLink />
                </a>
              )}
              {data.github_link && (
                <a href={data.github_link}>
                  Github
                  <ExternalLink />
                </a>
              )}
              {data.figma_link && (
                <a href={data.figma_link}>
                  Figma
                  <ExternalLink />
                </a>
              )}
            </Links>
          </StyledDiv>
        </S.HeadingContainer>

        {data.ingress && <Ingress spacing>{data.ingress}</Ingress>}
      </S.MaxWidthContainer>

      <Tabs>
        {Object.entries(tabs).map(
          ([key, value]) =>
            data[value] && (
              <Tab
                key={key}
                path={`${basePath}${key === "bruk" ? "" : "/" + key}`}
              >
                {changeTab ? (key === "tilgjengelighet" ? "UU" : key) : key}
              </Tab>
            )
        )}
      </Tabs>
      <S.SanityBlockContainer>
        <TableOfContents changedState={query.slug} />
        <S.MaxWidthContainer>
          {activeTab === "utvikling" &&
            (data as any)?.linked_packages?.length > 0 && (
              <MarginTop>
                <LevelTwoHeading>Installasjon</LevelTwoHeading>
                <Snippet node={installSnippet} />
              </MarginTop>
            )}
          {data[tabs[activeTab]] && (
            <SanityBlockContent withMargin blocks={data[tabs[activeTab]]} />
          )}
          {activeTab === "utvikling" && (
            <Changelog changelogs={changelogs} id={data._id} />
          )}
        </S.MaxWidthContainer>
      </S.SanityBlockContainer>
    </>
  );
};

export default ComponentPageTemplate;
