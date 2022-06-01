import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { BodyShort, Heading, Tabs } from "@navikt/ds-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  capitalize,
  dateStr,
  Feedback,
  logNav,
  slugger,
  TableOfContents,
  UnderArbeid,
} from "../..";

const ArtikkelTabbedTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.ds_artikkel;
  title: string;
}): JSX.Element => {
  const { query, push } = useRouter();

  useEffect(() => {
    slugger.reset();
  });

  if (!data.innhold_tabs || !data.heading) {
    return null;
  }
  const basePath = `/designsystem/side/${query.slug[0]}`;

  const tabs: string[] = data.innhold_tabs.map(
    (tab) => tab.title?.toLowerCase().replace(/\s+/g, "-") || "undefined"
  );
  const activeTab = query.slug[1] ? tabs.indexOf(query.slug[1]) : 0;
  const tabTitle = data?.innhold_tabs?.[activeTab]?.title;

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
      <div className="content-box">
        <div className="pt-8 pb-6">
          <Heading
            size="xlarge"
            level="1"
            spacing
            className="algolia-index-lvl1"
          >
            {data.heading}
          </Heading>

          <BodyShort
            size="small"
            as="span"
            className="flex items-center text-text-muted"
          >
            {`Oppdatert ${dateStr(data._updatedAt)}`}
          </BodyShort>
        </div>
      </div>
      {tabs.length > 1 && (
        <Tabs
          className="top-0 z-[1001]"
          value={data.innhold_tabs[activeTab]?.title
            .toLowerCase()
            .replace(/\s+/g, "-")}
          onChange={(x) => {
            push(`${basePath}/${x}`, undefined, { shallow: true });
            logNav("tabs", window.location.pathname, `${basePath}/${x}`);
          }}
        >
          <Tabs.List className="mx-0 px-2 md:mx-12 md:px-0">
            {data.innhold_tabs.map((x) => (
              <Tabs.Tab
                as="button"
                key={x.title}
                value={x.title?.toLowerCase().replace(/\s+/g, "-")}
                label={capitalize(x.title)}
              />
            ))}
          </Tabs.List>
          {data.innhold_tabs.map((x) => (
            <Tabs.Panel
              className="tabpanel relative max-w-full md:max-w-7xl"
              key={x.title}
              value={x.title?.toLowerCase().replace(/\s+/g, "-")}
            >
              <TableOfContents changedState={x.innhold} />
              <div className="content-box">
                {data?.under_arbeid?.status ? (
                  <UnderArbeid text={data?.under_arbeid?.forklaring} />
                ) : (
                  <SanityBlockContent className="mt-12" blocks={x.innhold} />
                )}
                <Feedback docId={data?._id} docType={data?._type} />
              </div>
            </Tabs.Panel>
          ))}
        </Tabs>
      )}
      <style jsx global>{`
        .tabpanel[data-state="active"] {
          display: flex;
        }
      `}</style>
    </>
  );
};

export default ArtikkelTabbedTemplate;
