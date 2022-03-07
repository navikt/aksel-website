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
  Avatar,
  Feedback,
  slugger,
  useAmplitude,
} from "../..";
import { AkselArtikkel, useSanityBannerImage } from "../../../lib";
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
  const [ttr, setTtr] = useState<number | null>(null);
  useClientLayoutEffect(() => {
    slugger.reset();
  });

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: asPath,
    });
  }, [asPath]);

  const imageProps = useSanityBannerImage(data?.banner?.banner_img);

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
      {data?.banner?.variant === "bilde" && data.banner.banner_img ? (
        <div className="relative h-60 w-full  sm:h-96 xl:-mb-40">
          <Image
            {...imageProps}
            alt={data?.banner?.banner_img?.alt}
            quality="100"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
      ) : (
        <div className="-mb-40 h-80 w-full rounded-2xl bg-gradient-to-br from-[#DD5E89] to-[#F7BB97]" />
      )}

      <div className="relative z-[2] mx-auto flex max-w-3xl flex-col rounded-2xl bg-gray-50 py-8 lg:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-1">
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
        <Heading size="xlarge" level="1" spacing className="index-lvl1">
          {data.heading}
        </Heading>

        <div className="flex gap-2">
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
