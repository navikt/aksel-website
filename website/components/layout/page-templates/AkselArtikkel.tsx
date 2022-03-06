import { Heading, useClientLayoutEffect } from "@navikt/ds-react";
import Head from "next/head";
import Image from "next/image";
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
      <div className="-mb-40 h-80 w-full rounded-2xl bg-gradient-to-br from-[#DD5E89] to-[#F7BB97]">
        {/* <Image
          src="https://cdn.sanity.io/images/hnbe3yhs/production/bbdf63cb06410989610da41742591f61d45fe4f5-800x248.svg?w=800&q=100&fit=clip&auto=format"
          objectFit="contain"
          layout="fill"
        /> */}
      </div>
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
