import { getTemaSlug, SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import {
  Detail,
  Heading,
  Label,
  useClientLayoutEffect,
} from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { dateStr, Feedback, slugger } from "../..";
import Footer from "../footer/Footer";
import AkselHeader from "../header/AkselHeader";

const AkselArtikkelTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.aksel_artikkel | SanityT.Schema.aksel_blogg;
  title: string;
}): JSX.Element => {
  useClientLayoutEffect(() => {
    slugger.reset();
  });

  if (!data.innhold || !data.heading) {
    return null;
  }

  const authors = (data?.contributors as any)?.map((x) => x?.title);

  const hasTema = "tema" in data && data.tema && data?.tema.length > 0;

  return (
    <>
      <Head>
        <title>{`${data?.heading} - ${title}`}</title>
        <meta property="og:title" content={`${data?.heading} - ${title}`} />
        <meta property="og:type" content="article" />
      </Head>

      <AkselHeader />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel bg-gray-50 pt-[8vw] pb-16 md:pb-32"
      >
        <div className="px-4">
          <div className="xs:w-[90%] mx-auto max-w-prose">
            <div>
              {hasTema &&
                data.tema.map(({ title }: any, y) => (
                  <>
                    {y !== 0 && `, `}
                    <NextLink
                      key={title}
                      href={`/tema/${getTemaSlug(title)}`}
                      passHref
                    >
                      <Label
                        size="small"
                        as="a"
                        className="index-lvl5 uppercase text-text hover:underline focus:underline focus:outline-none"
                      >
                        {title}
                      </Label>
                    </NextLink>
                  </>
                ))}
            </div>
            <Heading level="1" size="xlarge" className="index-lvl1 mt-1">
              {data.heading}
            </Heading>
            <div className="mt-6">
              <Detail as="address" className="not-italic">
                {authors?.[0] ?? ""}
              </Detail>
              <Detail as="span">{dateStr(data._createdAt)}</Detail>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="mt-8 px-4">
            <SanityBlockContent
              className="xs:w-[90%] markdown mx-auto max-w-prose"
              blocks={data?.innhold ?? []}
            />
          </div>
        </div>
        <div className="mt-16 px-4">
          <div className="xs:w-[90%] mx-auto max-w-prose border-t border-gray-300 pt-8">
            <Feedback akselFeedback docId={data?._id} docType={data?._type} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AkselArtikkelTemplate;

/*
<main
          tabIndex={-1}
          id="hovedinnhold"
          className="relative mx-auto flex min-h-screen-header w-full max-w-5xl flex-col items-center py-16 pb-4 focus:outline-none md:my-0 md:py-20 lg:pb-4"
        >
          <ArtikkelBreadcrumbs />
          {data?.banner?.variant === "bilde" && data.banner.banner_img ? (
            <div className="relative -mb-40 h-80 w-full lg:h-96">
              <Image
                src={imageProps.src}
                loader={imageProps.loader}
                alt={
                  data?.banner?.banner_img?.alt ??
                  "Presentasjonsbilde for artikkel"
                }
                quality="75"
                layout="fill"
                objectFit="cover"
                className="lg:rounded-2xl"
                priority
                unoptimized
              />
            </div>
          ) : (
            <div
              className="-mb-40 h-80 w-full lg:rounded-2xl"
              style={{ background: getGradient(data.heading) }}
            />
          )}
          <div className="mx-auto flex w-full max-w-[calc(100%_-_2.5rem)] justify-center">
            <div className="relative flex w-full max-w-[800px] flex-col items-center rounded-2xl bg-gray-50 py-8 sm:px-0 md:mx-6">
              <div className="w-full max-w-text px-4 md:mx-6 lg:mx-12 lg:px-0">
                <div className="index-ignore mb-4 flex flex-wrap items-center justify-center gap-1 lg:justify-start">
                  <BodyShort size="small" className="text-text-muted">
                    {ttr} min lesing {hasTema && "-"}
                  </BodyShort>
                  {hasTema &&
                    data.tema.map(({ title }: any) => (
                      <NextLink
                        key={title}
                        href={`/tema/${getTemaSlug(title)}`}
                        passHref
                      >
                        <Detail
                          size="small"
                          as="a"
                          className="index-lvl5 rounded bg-purple-100 py-[2px] px-[6px] text-purple-500 focus:outline-focus"
                        >
                          {title}
                        </Detail>
                      </NextLink>
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
                <div className="index-ignore flex justify-center gap-2 lg:justify-start">
                  {authors && authors.length > 0 ? (
                    <>
                      <Avatar name={authors[0]} large />
                      <div className="flex flex-col">
                        <span>
                          <BodyShort size="small" as="span">
                            av{" "}
                          </BodyShort>
                          <Label size="small" as="span">
                            {authors[0]}
                          </Label>
                        </span>
                        <Detail
                          as="span"
                          size="small"
                          className="index-lvl6 text-text-muted"
                        >
                          {dateStr(data._createdAt)}
                        </Detail>
                      </div>
                    </>
                  ) : (
                    <BodyShort
                      size="small"
                      className="index-lvl6 text-text-muted"
                    >
                      {dateStr(data._createdAt)}
                    </BodyShort>
                  )}
                </div>
              </div>
              }
              {data.innhold.length > 0 && (
                <SanityBlockContent
                  className="aksel-artikkel__blocks mt-12 min-h-[500px] w-full max-w-text px-0 sm:px-8 lg:px-0 "
                  blocks={data.innhold}
                />
              )}
              <div className="flex w-full justify-center">
                <div className="w-full max-w-text border-t border-t-gray-900/20 pt-6">
                  <BodyShort
                    as="span"
                    size="small"
                    className="flex pb-8 text-text-muted"
                  >
                    Sist oppdatert {dateStr(data._updatedAt)}
                  </BodyShort>
                  {authors && authors.length > 1 && (
                    <>
                      <Heading level="2" size="xsmall" spacing>
                        Bidratt til artikkelen
                      </Heading>
                      <ul className="flex flex-wrap gap-x-6 gap-y-4">
                        {authors.map((x) => (
                          <li key={x} className="flex items-center gap-2">
                            <Avatar name={x} />
                            <BodyShort>{x}</BodyShort>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              {!data?.metadata_feedback?.hide_feedback && (
                <Feedback center docId={data?._id} docType={data?._type} />
              )}
            </div>
          </div>
        </main>
*/
