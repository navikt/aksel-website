import { Heading } from "@navikt/ds-react";
import { useRouter } from "next/router";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import {
  LastUpdateTag,
  StatusTag,
  TableOfContents,
  Tabs,
  LayoutContext,
  slugger,
} from "../..";
import { DsTabbedArticlePage } from "../../../lib/autogen-types";
import { SanityBlockContent } from "../../SanityBlockContent";
import * as S from "./page.styles";
import { LayoutParts } from "../Layout";

const TabbedActiclePageTemplate = ({
  data,
}: {
  data: DsTabbedArticlePage;
}): JSX.Element => {
  const { query } = useRouter();
  const { version } = useContext(LayoutContext);

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

  return (
    <>
      <Head>
        {data.heading && LayoutParts?.[version]?.title && (
          <>
            <title>{`${data.heading} - ${LayoutParts?.[version].title}`}</title>
            <meta
              property="og:title"
              content={`${data.heading} - ${LayoutParts?.[version].title}`}
            />
          </>
        )}
      </Head>
      <S.MaxWidthContainer>
        <S.HeadingContainer>
          <Heading size="2xlarge" level="1" spacing>
            {data.heading}
          </Heading>
          <S.Inline>
            <StatusTag status={data.status} />
            <LastUpdateTag date={data.metadata.last_update} />
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
