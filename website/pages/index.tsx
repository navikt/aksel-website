import { Locked, Office1, Right, Star, System } from "@navikt/ds-icons";
import { BodyLong, BodyShort, Heading, Label } from "@navikt/ds-react";
import cl from "classnames";
import Head from "next/head";
import NextLink from "next/link";
import React, { useEffect } from "react";
import {
  AmplitudeEvents,
  getTemaSlug,
  PreviewBanner,
  Search,
  useAmplitude,
} from "../components";
import { PointingFingerIllustrasjon } from "../components/assets/PointingFinger";
import Footer from "../components/layout/footer/Footer";
import AkselHeader from "../components/layout/header/AkselHeader";
import { AkselTema, akselTema } from "../lib";
import { getClient } from "../lib/sanity/sanity.server";

const Page = ({ preview, temaer }: PageProps): JSX.Element => {
  const { logAmplitudeEvent } = useAmplitude();

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: "/",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Aksel - NAV</title>
        <meta property="og:title" content="Aksel - NAV" />
        <meta
          name="description"
          content="En samling ressurser fra ulike fagdisipliner som hjelper oss å skape bedre, universelt tilgjengelige og sammenhengende produkter i NAV."
        />
      </Head>
      {preview && <PreviewBanner />}
      <div className="forside--padding-x flex flex-col items-center justify-center pb-24">
        <Heading level="1" size="xlarge" spacing>
          Produktutvikling i praksis
        </Heading>

        <BodyShort className="mb-2">
          “The fast parts learn, the slow parts remember”
        </BodyShort>
        <BodyShort size="small" className="mb-8 text-text-muted">
          Stewart Brand
        </BodyShort>
        <Search full />
      </div>

      <div className="forside--padding-x flex w-full justify-center bg-gray-200 py-8">
        <div className="mx-auto flex flex-col items-center gap-4 whitespace-nowrap sm:flex-row">
          <NextLink href="/designsystem" passHref>
            <Label
              as="a"
              className="flex w-full items-center gap-3 rounded bg-white px-4 py-3 shadow-card outline-2 hover:underline focus:shadow-focus focus:outline-none lg:w-auto"
            >
              <System className="shrink-0 text-[1.5rem]" aria-hidden />
              Designsystemet
            </Label>
          </NextLink>
          <NextLink href="https://identitet.nav.no" passHref>
            <Label
              as="a"
              className="flex w-full items-center gap-3 rounded bg-white px-4 py-3 shadow-card hover:underline focus:shadow-focus focus:outline-none lg:w-auto"
            >
              <Office1 className="shrink-0 text-[1.5rem]" aria-hidden />
              Identitet
            </Label>
          </NextLink>

          <NextLink href="https://sikkerhet.nav.no" passHref>
            <Label
              as="a"
              className={cl(
                "relative flex w-full items-center gap-3 rounded bg-white py-3 pr-10 pl-4 shadow-card hover:underline focus:shadow-focus focus:outline-none lg:w-auto"
              )}
            >
              <Star className="shrink-0 text-[1.5rem]" aria-hidden />
              Security playbook
              <span className="absolute right-0 flex h-full items-center rounded-r bg-gray-500 px-1 text-text-inverted">
                <Locked title="Side ligger bak innlogging" />
              </span>
            </Label>
          </NextLink>
        </div>
      </div>
      {temaer && (
        <div className="forside--padding-x flex w-full max-w-6xl flex-col gap-8 py-24">
          <Heading level="2" size="xlarge">
            Siste temaer
          </Heading>

          <div className="grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 sm:gap-8 lg:justify-start xl:grid-cols-3">
            {temaer.map((tema) => (
              <div
                key={tema._id}
                className="group relative min-h-[12rem] min-w-[16rem] flex-1 cursor-pointer rounded border-2 border-transparent bg-white px-6 py-8 shadow-small focus-within:shadow-focus hover:border-link"
              >
                <NextLink href={`/tema/${getTemaSlug(tema.title)}`} passHref>
                  <Heading
                    as="a"
                    size="small"
                    className="index-lvl2 after:absolute after:inset-0 focus:underline focus:outline-none group-hover:text-link "
                  >
                    {tema.title}
                  </Heading>
                </NextLink>
                {tema?.oppsummering && (
                  <div className="mt-3">{tema.oppsummering}</div>
                )}

                <Right
                  className=" absolute right-4 bottom-4 -rotate-45"
                  aria-hidden
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="forside--padding-x">
        <div className="flex max-w-2xl flex-col items-center justify-between gap-4 rounded-2xl bg-gray-800 py-6 px-7 text-text-inverted sm:py-12 sm:pl-14 md:flex-row md:gap-0 md:pl-7">
          <div className="max-w-[350px]">
            <Heading size="large" level="2" spacing>
              Redaksjonen trenger deg!
            </Heading>
            <BodyLong>
              Vi trenger hjelp til å skrive innhold til Aksel. Har du ideer,
              mulighet til å skrive eller lurer på noe angående innhold? Ta
              kontakt med oss på Slack.
            </BodyLong>
          </div>
          <PointingFingerIllustrasjon className="mr-0 ml-5 flex-shrink-0 sm:ml-10 lg:mr-14" />
        </div>
      </div>
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <div className="bg-gray-50">
      <AkselHeader />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="relative flex min-h-screen w-full flex-col items-center py-16 focus:outline-none md:py-24"
      >
        {page}
      </main>
      <Footer />
    </div>
  );
};

interface PageProps {
  temaer: AkselTema[];
  slug: string;
  preview: boolean;
}

interface StaticProps {
  props: PageProps;
  revalidate: number;
}

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}): Promise<StaticProps> => {
  const temaer = await getClient(preview).fetch(akselTema);

  return {
    props: {
      temaer,
      slug: "/",
      preview,
    },
    revalidate: 30,
  };
};

export default Page;
