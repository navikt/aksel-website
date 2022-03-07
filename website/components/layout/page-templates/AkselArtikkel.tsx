import {
  BodyShort,
  Detail,
  Heading,
  Label,
  useClientLayoutEffect,
} from "@navikt/ds-react";
import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AmplitudeEvents,
  ArtikkelBreadcrumbs,
  Avatar,
  Feedback,
  slugger,
  useAmplitude,
} from "../..";
import { AkselArtikkel, useSanityBannerImage } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";
import Footer from "../footer/Footer";
import AkselHeader from "../header/AkselHeader";

const AkselArtikkelTemplate = ({
  data,
  title,
}: {
  data: AkselArtikkel;
  title: string;
}): JSX.Element => {
  const { asPath } = useRouter();
  const { logAmplitudeEvent } = useAmplitude();
  const [ttr, setTtr] = useState<number | null>(null);
  useClientLayoutEffect(() => {
    slugger.reset();
  });

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: asPath,
    });
  }, [asPath]);

  const imageProps: any = useSanityBannerImage(data?.banner?.banner_img);

  useEffect(() => {
    const wpm = 225;
    const text = document.getElementById("hovedinnhold").innerText;
    const words = text.trim().split(/\s+/).length;
    setTtr(Math.ceil(words / wpm));
  }, [data?.innhold]);

  if (!data.innhold || !data.heading) {
    return null;
  }
  /* console.log(data); */

  const author = (data?.contributors?.[0] as any)?.title;

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
      <div className="bg-gray-50">
        <AkselHeader className="bg-gray-50" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="relative mx-auto flex min-h-screen-header w-full max-w-6xl flex-col items-center py-16 pb-4 focus:outline-none md:my-0 md:py-20 lg:pb-4 xl:px-6"
        >
          <ArtikkelBreadcrumbs />
          {data?.banner?.variant === "bilde" && data.banner.banner_img ? (
            <div className="relative -mb-40 h-80 w-full lg:h-96">
              <Image
                src={imageProps.src}
                loader={imageProps.loader}
                alt={data?.banner?.banner_img?.alt}
                quality="75"
                layout="fill"
                objectFit="cover"
                className="lg:rounded-2xl"
                priority
                unoptimized
              />
            </div>
          ) : (
            <div className="-mb-40 h-80 w-full rounded-2xl bg-gradient-to-br from-[#DD5E89] to-[#F7BB97]" />
          )}
          <div className="mx-4 flex justify-center">
            <div className="relative flex w-full max-w-3xl flex-col rounded-2xl bg-gray-50 py-8 sm:px-0 ">
              <div className="px-4 md:mx-6 lg:mx-12 lg:px-9">
                <div className="mb-4 flex flex-wrap items-center justify-center gap-1 lg:justify-start">
                  <BodyShort size="small" className="text-text-muted">
                    {ttr} min lesing -
                  </BodyShort>
                  {data.tema.map(({ title }: any) => (
                    <Detail
                      size="small"
                      as="span"
                      key={title}
                      className="rounded bg-purple-100 py-[2px] px-[6px] text-purple-500"
                    >
                      {title}
                    </Detail>
                  ))}
                </div>
                <Heading
                  size="xlarge"
                  level="1"
                  spacing
                  className="index-lvl1 text-center lg:text-left"
                >
                  {data.heading}
                </Heading>

                <div className="flex justify-center gap-2 lg:justify-start">
                  {author ? (
                    <>
                      <Avatar name={author} />
                      <div>
                        av{" "}
                        <Label size="small" as="span">
                          {author}
                        </Label>
                        <Detail size="small" className="text-text-muted">
                          {moment(data._createdAt).format("DD. MMM. YY")}
                        </Detail>
                      </div>
                    </>
                  ) : (
                    <BodyShort size="small" className="text-text-muted">
                      {moment(data._createdAt).format("DD. MMM. YY")}
                    </BodyShort>
                  )}
                </div>
              </div>
              <SanityBlockContent
                className="mt-12 flex min-h-[500px] w-full flex-col items-center px-0 sm:px-8 lg:px-0"
                blocks={data.innhold}
              />
              {!data?.metadata_feedback?.hide_feedback && (
                <Feedback center docId={data?._id} docType={data?._type} />
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AkselArtikkelTemplate;
