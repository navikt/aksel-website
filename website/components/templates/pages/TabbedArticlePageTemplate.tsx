import { Heading } from "@navikt/ds-react";
import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";
import { LastUpdateTag, StatusTag } from "../../tags";
import TableOfContents from "../../table-of-contents";
import { Tab, Tabs } from "../../tabs";
import { SanityBlockContent } from "../../SanityBlockContent";
import {
  HeadingContainer,
  Inline,
  MaxWidthContainer,
  SanityBlockContainer,
} from "../TemplateStyles";

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
      <MaxWidthContainer>
        <HeadingContainer>
          <Heading size="2xlarge" level="1" spacing>
            {data.heading}
          </Heading>
          <Inline>
            <StatusTag status={data.status} />
            <LastUpdateTag date={data.last_update} />
          </Inline>
        </HeadingContainer>
      </MaxWidthContainer>
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
      <SanityBlockContainer>
        <TableOfContents changedState={data.body} />
        <MaxWidthContainer>
          <SanityBlockContent withMargin blocks={data.tabs[activeTab].body} />
        </MaxWidthContainer>
      </SanityBlockContainer>
    </>
  );
};

export default TabbedActiclePageTemplate;
