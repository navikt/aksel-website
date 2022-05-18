/* eslint-disable @next/next/no-img-element */
import { ArtikkelCard, logNav, PreviewBanner, TemaCard } from "@/components";
import { AkselHeader, Footer } from "@/layout";
import {
  AkselBlogg,
  akselBloggPosts,
  akselForsideQuery,
  AkselTema,
  akselTema,
  Riktekst,
} from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { Locked, Next, Office1, Star, System, Task } from "@navikt/ds-icons";
import { BodyLong, Heading, Label, Link, Tooltip } from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { getClient } from "../lib/sanity/sanity.server";

const RedaksjonsKort = () => (
  <div className="aksel-layout-x flex w-full justify-center">
    <div className="flex w-full max-w-2xl flex-col items-center justify-between gap-4 rounded-2xl bg-gray-800 py-6 px-7 text-text-inverted xs:flex-row xs:gap-0 xs:pl-7 sm:py-12 sm:pl-14">
      <div>
        <Heading size="large" level="2" spacing>
          Redaksjonen trenger deg!
        </Heading>
        <BodyLong>
          Vi trenger hjelp til å skrive innhold til Aksel. Har du ideer,
          mulighet til å skrive eller lurer på noe angående innhold? Ta kontakt
          med oss på Slack.
        </BodyLong>
      </div>
    </div>
  </div>
);

const Page = ({ preview, temaer, tekster, bloggs }: PageProps): JSX.Element => {
  const logPortalCard = (e) =>
    logNav(
      "portal-kort",
      window.location.pathname,
      e.currentTarget.getAttribute("href")
    );

  const hasPrinsipp1 =
    tekster?.prinsipp_1 &&
    tekster?.prinsipp_1?.hovedside &&
    tekster?.prinsipp_1?.vis &&
    tekster?.prinsipp_1?.undersider.length ===
      tekster?.prinsipp_1.undersider.filter((x) => !!x).length;

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
      <div className="bg-gray-50">
        <AkselHeader frontPage />

        <main tabIndex={-1} id="hovedinnhold">
          <div className="relative bg-gray-900 bg-gradient-to-b from-gray-900 via-deepblue-900/50 to-deepblue-700 px-4 py-16 text-white">
            <div className="mx-auto max-w-aksel xs:w-[90%]">
              <div className="gap-6 md:grid md:grid-cols-3">
                <div className="pr-6 md:col-span-2">
                  <h1 className="text-3xl font-semibold leading-tight tracking-tight xs:text-5xl xs:leading-tight">
                    NAVs digitale verktøykasse for&nbsp;produktutvikling
                  </h1>
                  <div className="mt-6 max-w-prose leading-normal text-deepblue-100/95">
                    <p>Velkommen til Aksel!</p>
                    <p className="mt-6">
                      Dette er begynnelsen på NAVs digitale verktøykasse for
                      produktutvikling. Vi har trua på å jobbe åpent med
                      nettsiden, derfor er noen biter litt uferdige.
                    </p>
                    <p className="mt-6">
                      Om du vil gi oss tilbakemelding kan du bruke
                      skjema&nbsp;i&nbsp;footer&nbsp;👇
                    </p>
                  </div>
                </div>
                <div className="mt-12 md:mt-4">
                  <h2 className="text-base font-semibold uppercase tracking-widest text-white">
                    Portaler
                  </h2>
                  <div className="mt-3 grid grid-flow-row justify-items-start gap-4 xs:grid-cols-3 sm:grid-cols-2 md:grid-cols-1">
                    <a
                      className="group flex items-center gap-2 xs:w-auto"
                      href="#"
                    >
                      <div className="grid aspect-square w-12 place-items-center rounded-full bg-deepblue-500/20 group-hover:bg-white group-hover:text-deepblue-900">
                        <svg
                          className="h-7 w-7"
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          focusable="false"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M6 42v-7.8l9.7-9.7-8.95-9a3.03 3.03 0 0 1-.9-2.1 3.03 3.03 0 0 1 .9-2.1l4.5-4.55a3.03 3.03 0 0 1 2.1-.9 3.07 3.07 0 0 1 2.15.9l9 9 9.85-9.85c.17-.17.33-.28.5-.33.17-.04.35-.07.55-.07.2 0 .38.03.55.08.17.04.33.15.5.32l5.65 5.65c.17.17.28.33.33.5.05.17.07.35.07.55 0 .2-.02.38-.07.55a1.2 1.2 0 0 1-.33.5l-9.85 9.85 9 9a3.07 3.07 0 0 1 .9 2.15 3.03 3.03 0 0 1-.9 2.1l-4.5 4.45a3.03 3.03 0 0 1-2.1.9 3.03 3.03 0 0 1-2.1-.9l-9-8.95L13.8 42H6Zm11.85-19.65 4.5-4.5-3.65-3.65-2.4 2.4-2.1-2.1 2.4-2.4-3.2-3.2-4.5 4.5 8.95 8.95Zm16.7 16.75 4.5-4.5-3.2-3.2-2.4 2.4-2.1-2.1 2.4-2.4-3.65-3.65-4.5 4.5 8.95 8.95ZM9 39h3.5l20.75-20.75-3.5-3.5L9 35.5V39Zm26.35-22.85 3.5-3.5-3.5-3.5-3.5 3.5 3.5 3.5Z"
                          ></path>
                        </svg>
                      </div>
                      <div className="">
                        <h3 className="font-semibold leading-tight group-hover:underline">
                          Designsystem
                        </h3>
                        <p className="text-sm text-deepblue-100/95">
                          Åpen for alle
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Temaseksjon */}
          <section className="relative bg-deepblue-50 px-4 pt-12 pb-16">
            {/* Separator */}
            <svg
              className="absolute inset-x-0 top-0 w-full"
              viewBox="0 0 100 12"
              focusable="false"
              aria-hidden="true"
            >
              <polygon
                points="0,0 100,0 0,12"
                className="fill-deepblue-700"
              ></polygon>
            </svg>
            <div className="relative z-10 mx-auto -mt-16 max-w-aksel xs:w-[90%]">
              <h2 className="text-base font-semibold uppercase tracking-widest text-white">
                Temaer
              </h2>
              <div className="mt-4 grid gap-3 xs:gap-6 sm:grid-cols-2 md:grid-cols-3">
                {/* Temakort */}
                <a
                  className="group relative rounded-r-md bg-white shadow hover:bg-orange-100 sm:shadow-md"
                  href="/topic"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-3 bg-deepblue-600/20 group-hover:bg-orange-300"
                  ></div>
                  <div className="grid h-full justify-items-start gap-2 px-6 py-4 md:px-8 md:pt-10 md:pb-8">
                    <h3 className="mb-4 text-2xl font-semibold md:mb-12 md:text-3xl">
                      Design
                    </h3>
                    <div className="mt-auto border-t-4 border-blue-200 pt-2 text-sm uppercase opacity-80 group-hover:border-orange-300">
                      X artikler
                    </div>
                  </div>
                </a>
              </div>
              <a
                className="mt-6 inline-block text-text underline hover:text-deepblue-700 hover:no-underline"
                href="#"
              >
                Utforsk alle temaer
              </a>
            </div>
          </section>

          {/* Prinsipper */}
          <section className="hidden bg-deepblue-50 px-4 pt-0 pb-16 md:pt-12">
            <div className="relative z-10 mx-auto max-w-aksel xs:w-[90%]">
              <div className="grid gap-x-8 sm:grid-flow-col-dense">
                <div className="xs:row-span-3 sm:col-start-2 md:-mt-20 md:-mb-12">
                  <img
                    className="mx-auto w-56 max-w-xs xs:mx-auto xs:max-w-md sm:w-full"
                    src="/static/images/prinsipper.webp"
                    width="800"
                    alt=""
                  />
                </div>
                <div className="col-span-2 col-start-1 self-end sm:col-span-1">
                  <div className="max-w-prose">
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight xs:mt-auto xs:text-4xl">
                      Prinsipper for brukeropplevelse
                    </h2>
                    <p className="mt-3 text-lg">
                      NAV skal ivareta sine målgrupper og brukere. Det er
                      sentralt i vårt formål. Vi har derfor utarbeidet 9
                      prinsipper som skal tydeliggjøre forholdet mellom vår
                      visjon, våre verdier, vårt ansvar og hvordan vi når ut.
                    </p>
                  </div>
                </div>
                <div className="col-span-2 col-start-1 xs:col-span-1">
                  <div className="mt-8 flex flex-wrap gap-2 md:max-w-4xl md:gap-3">
                    <a
                      className="flex w-full items-center justify-between gap-4 rounded-md bg-white px-6 py-4 leading-tight shadow-sm transition ease-out hover:bg-gray-800 hover:text-white hover:shadow-md sm:w-auto"
                      href="#"
                    >
                      <span className="font-semibold">
                        Jeg får tillit og muligheter
                      </span>
                      <svg
                        className="-mr-1 sm:hidden"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path
                          d="M9 6, l6 6 -6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        ></path>
                      </svg>{" "}
                    </a>
                    <a
                      className="flex w-full items-center justify-between gap-4 rounded-md bg-white px-6 py-4 leading-tight shadow-sm transition ease-out hover:bg-gray-800 hover:text-white hover:shadow-md sm:w-auto"
                      href="#"
                    >
                      <span className="font-semibold">
                        NAV er min støttespiller
                      </span>
                      <svg
                        className="-mr-1 sm:hidden"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path
                          d="M9 6, l6 6 -6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        ></path>
                      </svg>{" "}
                    </a>
                    <a
                      className="flex w-full items-center justify-between gap-4 rounded-md bg-white px-6 py-4 leading-tight shadow-sm transition ease-out hover:bg-gray-800 hover:text-white hover:shadow-md sm:w-auto"
                      href="#"
                    >
                      <span className="font-semibold">
                        Jeg blir møtt på min situasjon og mine behov
                      </span>
                      <svg
                        className="-mr-1 sm:hidden"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path
                          d="M9 6, l6 6 -6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        ></path>
                      </svg>{" "}
                    </a>
                    <a
                      className="flex w-full items-center justify-between gap-4 rounded-md bg-white px-6 py-4 leading-tight shadow-sm transition ease-out hover:bg-gray-800 hover:text-white hover:shadow-md sm:w-auto"
                      href="#"
                    >
                      <span className="font-semibold">Jeg blir inkludert</span>
                      <svg
                        className="-mr-1 sm:hidden"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <path
                          d="M9 6, l6 6 -6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <a
                    className="mt-6 inline-block text-text underline hover:text-deepblue-700 hover:no-underline"
                    href="#"
                  >
                    Utforsk alle prinsippene
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="relative bg-white px-4 pb-24">
            {/* Separator */}
            <svg
              className="absolute inset-x-0 top-0 w-full"
              viewBox="0 0 100 12"
              focusable="false"
              aria-hidden="true"
            >
              <polygon
                points="0,0 100,0 0,12"
                className="fill-deepblue-50"
              ></polygon>
            </svg>

            <div className="relative z-10 mx-auto max-w-aksel xs:w-[90%]">
              <div className="gap-12 xs:grid xs:grid-cols-3 xs:items-start">
                {/* Redaksjons-kort */}
                <div className="grid overflow-hidden rounded-lg shadow xs:sticky xs:top-24">
                  <div className="bg-deepblue-900 px-6 py-6 text-white">
                    <h2 className="text-2xl font-semibold">
                      Aksel trenger deg!
                    </h2>
                    <p className="mt-1 max-w-prose">
                      Vi trenger hjelp med å lage innhold til Aksel. Har du
                      ideer, mulighet til å skrive eller lurer på noe om
                      produktutvikling?
                    </p>
                  </div>
                  <a
                    className="group flex items-center justify-between bg-deepblue-200 px-6 py-4 leading-snug transition ease-out hover:bg-deepblue-300 hover:underline"
                    href="#"
                  >
                    <span>
                      Ta kontakt med{" "}
                      <strong className="font-semibold">#aksel</strong> på Slack
                    </span>
                  </a>
                </div>
                {/* Blogg */}
                <div className="order-1 mt-16 xs:col-span-2 xs:mt-44">
                  <h2 className="text-base font-semibold uppercase tracking-widest">
                    Blogg
                  </h2>
                  <div className="mt-1 divide-y divide-gray-200">
                    {/* Blogg-kort */}
                    <div className="grid grid-flow-row-dense grid-cols-[1fr_auto] items-start gap-x-8 py-8">
                      <time
                        className="col-span-2 text-sm uppercase tracking-wide text-gray-600 xs:col-span-1"
                        dateTime="11. Mai 2022"
                      >
                        11. Mai 2022
                      </time>
                      <h3 className="col-span-2 col-start-1 text-3xl font-semibold text-gray-800 xs:col-span-1">
                        <a
                          className="text-deepblue-700 hover:text-deepblue-600 hover:underline"
                          href="/article"
                        >
                          Lage gode skjemaer
                        </a>
                      </h3>
                      <p className="col-start-1 mt-1 text-gray-800">
                        Kort introduksjon av bloggposten. Lorem ipsum dolor sit
                        amet consectetur, adipisicing elit. Ducimus quisquam
                        quae excepturi, culpa pariatur.
                      </p>
                      <div className="col-start-2 row-span-3 row-start-3 xs:row-start-1">
                        <img
                          className="mt-3 aspect-square w-24 bg-gray-200 sm:mt-0 sm:w-32"
                          src=""
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <a
                    className="mt-6 inline-block text-text underline hover:text-deepblue-700 hover:no-underline"
                    href="#"
                  >
                    Flere bloggposter
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export interface AkselTemaT extends AkselTema {
  refCount: number;
}

interface PageProps {
  temaer: AkselTemaT[];
  bloggs: Partial<
    AkselBlogg & { slug: string; contributors?: { title?: string }[] }
  >[];
  tekster: {
    title?: string;
    beskrivelse?: Riktekst;
    prinsipp_1: {
      beskrivelse?: Riktekst;
      vis: boolean;
      hovedside: { heading: string; slug: { current: string } };
      undersider: { heading: string; slug: { current: string } }[];
    };
  };
  slug: string;
  preview: boolean;
}

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}) => {
  const client = getClient(true);

  const temaer = await client.fetch(akselTema);
  const bloggs = await client.fetch(akselBloggPosts);
  const tekster = await client.fetch(akselForsideQuery);

  return {
    props: {
      temaer,
      bloggs,
      tekster,
      slug: "/",
      preview,
    },
    revalidate: 60,
  };
};

export default Page;
