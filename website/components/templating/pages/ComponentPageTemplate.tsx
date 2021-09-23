import { Ingress, Link, Heading, Tag } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import FigmaIcon from "../../assets/FigmaIcon";
import GithubIcon from "../../assets/GithubIcon";
import NpmIcon from "../../assets/NpmIcon";
import LastUpdated from "../../LastUpdated";
import StatusTag from "../../StatusTag";
import TableOfContents from "../../TableOfContents";
import { Tab, Tabs } from "../../Tabs";
import { SanityBlockContent } from "../SanityBlockContent";
import {
  HeadingContainer,
  Inline,
  MaxWidthContainer,
  SanityBlockContainer,
} from "../TemplateStyles";

const Links = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  column-gap: 1rem;
  margin-left: var(--navds-spacing-4);

  a {
    text-decoration: none;
    color: var(--navds-color-darkgray);
    padding: 0.25rem;
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
      <MaxWidthContainer>
        <HeadingContainer>
          <Heading size="2xlarge" level="1" spacing>
            {data.heading}
          </Heading>
          <StyledDiv>
            <Inline>
              <StatusTag status={data.status} />
              <Tag variant="info">
                <LastUpdated date={data.last_update} />
              </Tag>
            </Inline>
            <Links>
              {data.npm_link && (
                <Link href={data.npm_link}>
                  <NpmIcon />
                </Link>
              )}
              {data.github_link && (
                <Link href={data.github_link}>
                  <GithubIcon />
                </Link>
              )}
              {data.figma_link && (
                <Link href={data.figma_link}>
                  <FigmaIcon />
                </Link>
              )}
            </Links>
          </StyledDiv>
        </HeadingContainer>

        {data.ingress && <Ingress spacing>{data.ingress}</Ingress>}
      </MaxWidthContainer>

      <Tabs>
        {Object.entries(tabs).map(
          ([key, value]) =>
            data[value] && (
              <Tab
                key={key}
                path={`${basePath}${key === "bruk" ? "" : "/" + key}`}
              >
                {/* TODO: Fungerer UU her? Tar mye mindre plass en Tilgjengelighet for mobilvisning */}
                {key === "tilgjengelighet" ? "UU" : key}
              </Tab>
            )
        )}
      </Tabs>
      <SanityBlockContainer>
        <TableOfContents changedState={query.slug} />
        <MaxWidthContainer>
          <SanityBlockContent withMargin blocks={data[tabs[activeTab]]} />
        </MaxWidthContainer>
      </SanityBlockContainer>
    </>
  );
};

export default ComponentPageTemplate;
