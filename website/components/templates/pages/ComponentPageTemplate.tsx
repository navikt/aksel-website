import { Ingress, Link, Heading } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import {
  FigmaIcon,
  GithubIcon,
  NpmIcon,
  LastUpdateTag,
  StatusTag,
  TableOfContents,
  Tab,
  Tabs,
} from "../..";
import { SanityBlockContent } from "../../SanityBlockContent";
import * as S from "./page.styles";

const Links = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  column-gap: 1rem;
  margin-left: var(--navds-spacing-4);

  a {
    text-decoration: none;
    color: var(--navds-color-darkgray);
    padding: 0.25rem;
    transition: box-shadow 100ms;

    :hover {
      text-decoration: underline;
      background: transparent;
    }

    :focus {
      background: transparent;
    }
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--navds-spacing-2);
  justify-content: space-between;
`;

const ComponentPageTemplate = ({ data }: { data: any }): JSX.Element => {
  const { query } = useRouter();

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
    <>
      <S.MaxWidthContainer>
        <S.HeadingContainer>
          <Heading size="2xlarge" level="1" spacing>
            {data.heading}
          </Heading>
          <StyledDiv>
            <S.Inline>
              <StatusTag status={data.status} />
              <LastUpdateTag date={data.last_update} />
            </S.Inline>
            <Links>
              {data.npm_link && (
                <Link href={data.npm_link}>
                  <NpmIcon />
                  <span className="sr-only">Lenke til NPM side for pakke</span>
                </Link>
              )}
              {data.github_link && (
                <Link href={data.github_link}>
                  <GithubIcon />
                  <span className="sr-only">Lenke til github koden</span>
                </Link>
              )}
              {data.figma_link && (
                <Link href={data.figma_link}>
                  <FigmaIcon />
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
                {/* TODO: Fungerer UU her? Tar mye mindre plass en Tilgjengelighet for mobilvisning */}
                {/* {key === "Tilgjengelighet" ? "UU" : key} */}
                {key}
              </Tab>
            )
        )}
      </Tabs>
      <S.SanityBlockContainer>
        <TableOfContents changedState={query.slug} />
        <S.MaxWidthContainer>
          <SanityBlockContent withMargin blocks={data[tabs[activeTab]]} />
        </S.MaxWidthContainer>
      </S.SanityBlockContainer>
    </>
  );
};

export default ComponentPageTemplate;
