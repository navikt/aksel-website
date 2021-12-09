import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import {
  LastUpdateTag,
  LayoutContext,
  slugger,
  StatusTag,
  TableOfContents,
  Tabs,
} from "../..";
import { DsTabbedArticlePage } from "../../../lib/autogen-types";
import { SanityBlockContent } from "../../SanityBlockContent";
import * as S from "./page.styles";

const TabbedActiclePageTemplate = ({
  data,
  title,
}: {
  data: DsTabbedArticlePage;
  title: string;
}): JSX.Element => {
  const { query } = useRouter();
  const layout = useContext(LayoutContext);
  useEffect(() => {
    slugger.reset();
  });

  const { asPath } = useRouter();

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
  const tabTitle = data?.tabs?.[activeTab]?.title;

  return (
    <>
      <Head>
        {data.heading && (
          <>
            <title>{`${data.heading} ${tabTitle ?? ""} - ${title}`}</title>
            <meta property="og:title" content={`${data.heading} - ${title}`} />
          </>
        )}
      </Head>
      <S.MaxWidthContainer>
        <S.HeadingContainer>
          <Heading
            size={
              layout.isTablet
                ? layout.isMobile
                  ? "large"
                  : "xlarge"
                : "2xlarge"
            }
            level="1"
            spacing
          >
            {data.heading}
          </Heading>
          <S.Inline>
            <LastUpdateTag date={data.metadata.last_update} />
            <StatusTag status={data.status} />
          </S.Inline>
        </S.HeadingContainer>
        {data.ingress && <SanityBlockContent isIngress blocks={data.ingress} />}
      </S.MaxWidthContainer>
      {tabs.length > 1 && (
        <Tabs
          title={data.heading}
          tabs={[
            ...tabs
              .map((tab, i) =>
                data.tabs[i]
                  ? {
                      name: data.tabs[i].title,
                      path: `${basePath}/${tab}`,
                      active:
                        activeTab === i
                          ? activeTab === i
                          : `${basePath}/${tab}` ===
                            new URL(asPath, "http://example.com").pathname,
                    }
                  : null
              )
              .filter((x) => !!x),
          ]}
        />
      )}
      <S.SanityBlockContainer>
        <TableOfContents changedState={data.tabs[activeTab].body} />
        <S.MaxWidthContainer>
          <SanityBlockContent withMargin blocks={data.tabs[activeTab].body} />
        </S.MaxWidthContainer>
      </S.SanityBlockContainer>
    </>
  );
};

export default TabbedActiclePageTemplate;
