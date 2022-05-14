import { Heading, useClientLayoutEffect } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { Feedback, LastUpdateTag, slugger, TableOfContents } from "../..";
import { DsArtikkel } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";

const ArtikkelTemplate = ({
  data,
  title,
}: {
  data: DsArtikkel;
  title: string;
}): JSX.Element => {
  useClientLayoutEffect(() => {
    slugger.reset();
  });

  if (!data.innhold || !data.heading) {
    return null;
  }

  return (
    <>
      <Head>
        {data.heading && (
          <>
            <title>{`${data.heading} - ${title}`}</title>
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
          <LastUpdateTag date={data._updatedAt} />
        </div>
      </div>
      <div className="relative flex max-w-full lg:max-w-7xl">
        <TableOfContents changedState={data.innhold} />
        <div className="content-box">
          <SanityBlockContent className="mt-12" blocks={data.innhold} />
          {!data?.metadata_feedback?.hide_feedback && (
            <Feedback docId={data?._id} docType={data?._type} />
          )}
        </div>
      </div>
    </>
  );
};

export default ArtikkelTemplate;
