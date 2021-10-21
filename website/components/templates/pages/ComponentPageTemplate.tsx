import { Heading, Ingress, Link } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React from "react";
import { useMedia } from "react-use";
import styled from "styled-components";
import {
  Changelog,
  FigmaIconGrayScale,
  GithubIconGrayScale,
  LastUpdateTag,
  LevelTwoHeading,
  NpmIconGrayScale,
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
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  column-gap: 0.25rem;
  font-size: 1.25rem;
  margin-left: var(--navds-spacing-4);

  a {
    text-decoration: none;
    color: var(--navds-color-darkgray);
    padding: 0.75rem;
    transition: box-shadow 100ms;

    :hover {
      text-decoration: underline;
      background: var(--navds-color-blue-10);
    }

    :focus {
      background: transparent;
    }

    :focus:hover {
      background: var(--navds-color-blue-10);
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
                <Link href={data.npm_link}>
                  <NpmIconGrayScale />
                  <span className="sr-only">Lenke til NPM side for pakke</span>
                </Link>
              )}
              {data.github_link && (
                <Link href={data.github_link}>
                  <GithubIconGrayScale />
                  <span className="sr-only">Lenke til github koden</span>
                </Link>
              )}
              {data.figma_link && (
                <Link href={data.figma_link}>
                  <FigmaIconGrayScale />
                  <span className="sr-only">Link til Figma dokument</span>
                </Link>
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
