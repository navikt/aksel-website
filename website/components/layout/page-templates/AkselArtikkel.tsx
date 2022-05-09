import {
  AkselArtikkel,
  AkselBlogg,
  getTemaSlug,
  useSanityBannerImage,
} from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import {
  BodyShort,
  Detail,
  Heading,
  Label,
  useClientLayoutEffect,
} from "@navikt/ds-react";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { ArtikkelBreadcrumbs, Avatar, dateStr, Feedback, slugger } from "../..";
import Footer from "../footer/Footer";
import AkselHeader from "../header/AkselHeader";

export const getGradient = (s: string) => {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 360;
  const h2 = h + (5 % 360);

  return `linear-gradient(-45deg, hsl(${h2}, 70%, 70%) 0%, hsl(${h}, 80%, 80%) 100%)`;
};

/* const LoginSection = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="aksel-artikkel__blocks mt-12 min-h-[500px] px-0 sm:p-8">
      <div className=" relative -mb-8 flex min-h-16 w-16  items-center justify-center rounded-full border-border-muted bg-gray-200">
        <Locked aria-label="Innholdet er bak innlogging" className="h-8 w-8" />
      </div>
      <div className="flex w-full flex-col items-center justify-evenly gap-4 rounded-lg border border-border-muted bg-gray-50 bg-center px-8 pb-6 pt-12">
        <Heading level="2" size="xsmall">
          Dette innholdet er bare tilgjengelig for NAV-ansatte.
        </Heading>
        <Button onClick={onClick}>Logg inn</Button>
      </div>
    </div>
  );
}; */

const AkselArtikkelTemplate = ({
  data,
  title,
}: {
  data: AkselArtikkel | AkselBlogg;
  title: string;
}): JSX.Element => {
  /* const { pageProps } = useContext(PagePropsContext);
  const authContext = useContext(AuthenticationContext); */

  const [ttr, setTtr] = useState<number | null>(null);
  useClientLayoutEffect(() => {
    slugger.reset();
  });

  const imageProps: any = useSanityBannerImage(data?.banner?.banner_img);

  useEffect(() => {
    const wpm = 225;
    const text = document.getElementById("hovedinnhold")?.innerText;
    if (!text) return;
    const words = text.trim().split(/\s+/).length;
    setTtr(Math.ceil(words / wpm));
  }, [data?.innhold]);

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
        <meta property="og:image" content={imageProps?.src} />
      </Head>

      <div className="aksel-artikkel">
        <AkselHeader />
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
              {/* {pageProps?.validUser !== undefined && !pageProps.validUser && (
                <LoginSection onClick={() => authContext.login()} />
              )} */}
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
        <Footer />
      </div>
    </>
  );
};

export default AkselArtikkelTemplate;
