import { Heading } from "@navikt/ds-react";
import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";
import { LastUpdateTag, StatusTag, TableOfContents, Tab, Tabs } from "../..";
import { SanityBlockContent } from "../../SanityBlockContent";
import * as S from "./page.styles";

const TabbedActiclePageTemplate = ({
  data,
}: {
  data: any;
  sidebar: any;
}): JSX.Element => {
  const { query } = useRouter();

  if (!data.tabs || !data.heading || !data.status) {
    return null;
  }

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

  return (
    <>
      <S.MaxWidthContainer>
        <S.HeadingContainer>
          <Heading size="2xlarge" level="1" spacing>
            {data.heading}
          </Heading>
          <S.Inline>
            <StatusTag status={data.status} />
            <LastUpdateTag date={data.last_update} />
          </S.Inline>
        </S.HeadingContainer>
      </S.MaxWidthContainer>
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
      <S.SanityBlockContainer>
        <TableOfContents changedState={data.body} />
        <S.MaxWidthContainer>
          <SanityBlockContent withMargin blocks={data.tabs[activeTab].body} />
        </S.MaxWidthContainer>
      </S.SanityBlockContainer>
    </>
  );
};

export default TabbedActiclePageTemplate;
