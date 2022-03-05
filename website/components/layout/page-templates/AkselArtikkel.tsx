import { Heading, useClientLayoutEffect } from "@navikt/ds-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  AmplitudeEvents,
  Feedback,
  LastUpdateTag,
  slugger,
  useAmplitude,
} from "../..";
import { AkselArtikkel } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";

const AkselArtikkelTemplate = ({
  data,
  title,
}: {
  data: AkselArtikkel;
  title: string;
}): JSX.Element => {
  const { asPath } = useRouter();
  const { logAmplitudeEvent } = useAmplitude();

  useClientLayoutEffect(() => {
    slugger.reset();
  });

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: asPath,
    });
  }, [asPath]);

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
      <div className="-mb-40 h-80 w-full rounded-2xl bg-gradient-to-br from-[#DD5E89] to-[#F7BB97]" />
      <div className="mx-auto flex max-w-3xl flex-col rounded-2xl bg-gray-50 p-8">
        <Heading size="xlarge" level="1" spacing className="index-lvl1 ">
          {data.heading}
        </Heading>
        {/* <LastUpdateTag date={data._updatedAt} simple /> */}

        <SanityBlockContent
          className="mt-12 flex min-h-[500px] w-full flex-col"
          blocks={data.innhold}
        />
        {!data?.metadata_feedback?.hide_feedback && (
          <Feedback center docId={data?._id} docType={data?._type} />
        )}
      </div>
    </>
  );
};

export default AkselArtikkelTemplate;
