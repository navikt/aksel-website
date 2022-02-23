import { Heading, useClientLayoutEffect } from "@navikt/ds-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import {
  AmplitudeEvents,
  Feedback,
  LastUpdateTag,
  PagePropsContext,
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
  const { pageProps } = useContext(PagePropsContext);
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
      <div className="w-full max-w-7xl">
        <div className="relative flex max-w-full flex-col justify-center">
          <div className="flex flex-col items-center pt-8 pb-6">
            <LastUpdateTag date={data._updatedAt} simple />
            <Heading size="xlarge" level="1" spacing className="index-lvl1">
              {data.heading}
            </Heading>
          </div>
          {/* <TableOfContents changedState={data.innhold} /> */}
          <SanityBlockContent
            className="mx-auto mt-12 min-h-[500px]"
            blocks={data.innhold}
          />
          {!data?.metadata_feedback?.hide_feedback && (
            <Feedback
              center
              docId={pageProps?.page?._id}
              docType={pageProps?.page?._type}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AkselArtikkelTemplate;
