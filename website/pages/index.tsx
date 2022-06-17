/* eslint-disable @next/next/no-img-element */
import { BloggCard, logNav, PreviewBanner, TemaCard } from "@/components";
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
import { Next } from "@navikt/ds-icons";
import { BodyLong, Detail, Heading, Link } from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { getClient } from "@/sanity-client";

/* const portalkort = [
  {
    title: "Designsystem",
    description: "Åpen for alle",
    icon: `<svg class="w-7 h-7" width="48" height="48" viewBox="0 0 48 48" fill="none" focusable="false" aria-hidden="true"><path fill="currentColor" d="M6 42v-7.8l9.7-9.7-8.95-9a3.03 3.03 0 0 1-.9-2.1 3.03 3.03 0 0 1 .9-2.1l4.5-4.55a3.03 3.03 0 0 1 2.1-.9 3.07 3.07 0 0 1 2.15.9l9 9 9.85-9.85c.17-.17.33-.28.5-.33.17-.04.35-.07.55-.07.2 0 .38.03.55.08.17.04.33.15.5.32l5.65 5.65c.17.17.28.33.33.5.05.17.07.35.07.55 0 .2-.02.38-.07.55a1.2 1.2 0 0 1-.33.5l-9.85 9.85 9 9a3.07 3.07 0 0 1 .9 2.15 3.03 3.03 0 0 1-.9 2.1l-4.5 4.45a3.03 3.03 0 0 1-2.1.9 3.03 3.03 0 0 1-2.1-.9l-9-8.95L13.8 42H6Zm11.85-19.65 4.5-4.5-3.65-3.65-2.4 2.4-2.1-2.1 2.4-2.4-3.2-3.2-4.5 4.5 8.95 8.95Zm16.7 16.75 4.5-4.5-3.2-3.2-2.4 2.4-2.1-2.1 2.4-2.4-3.65-3.65-4.5 4.5 8.95 8.95ZM9 39h3.5l20.75-20.75-3.5-3.5L9 35.5V39Zm26.35-22.85 3.5-3.5-3.5-3.5-3.5 3.5 3.5 3.5Z"/></svg>`,
  },
  {
    title: "Identitet",
    description: "Åpen for alle",
    icon: `<svg class="w-7 h-7" width="48" height="48" viewBox="0 0 48 48" fill="none" focusable="false" aria-hidden="true"><path fill="currentColor" d="M19.25 27.4 21.05 21.65 16.3 17.95H22.1L24 12L25.85 17.95H31.7L26.95 21.65L28.7 27.4L24 23.85ZM12.2 46V30.8Q9.95 28.45 8.975 25.65Q8 22.85 8 20Q8 13.2 12.6 8.6Q17.2 4 24 4Q30.8 4 35.4 8.6Q40 13.2 40 20Q40 22.85 39.025 25.65Q38.05 28.45 35.8 30.8V46L24 42.05ZM24 33Q29.45 33 33.225 29.225Q37 25.45 37 20Q37 14.55 33.225 10.775Q29.45 7 24 7Q18.55 7 14.775 10.775Q11 14.55 11 20Q11 25.45 14.775 29.225Q18.55 33 24 33ZM15.2 41.8 24 39.05 32.8 41.8V33.25Q30.8 34.7 28.5 35.35Q26.2 36 24 36Q21.8 36 19.5 35.35Q17.2 34.7 15.2 33.25ZM24 37.5Q24 37.5 24 37.5Q24 37.5 24 37.5Q24 37.5 24 37.5Q24 37.5 24 37.5Z"/></svg>`,
  },
  {
    title: "Etterlevelse",
    description: "Kun for ansatte",
    icon: `<svg class="w-7 h-7" width="48" height="48" viewBox="0 0 48 48" fill="none" focusable="false" aria-hidden="true"><path fill="currentColor" d="M17.3 45 13.5 38.5 5.95 36.95 6.8 29.6 2 24 6.8 18.45 5.95 11.1 13.5 9.55 17.3 3 24 6.1 30.7 3 34.55 9.55 42.05 11.1 41.2 18.45 46 24 41.2 29.6 42.05 36.95 34.55 38.5 30.7 45 24 41.9ZM24 24ZM21.85 30.65 33.2 19.4 30.95 17.35 21.85 26.35 17.1 21.4 14.8 23.65ZM18.65 41.05 24 38.8 29.5 41.05 32.85 36.05 38.7 34.55 38.1 28.6 42.15 24 38.1 19.3 38.7 13.35 32.85 11.95 29.4 6.95 24 9.2 18.5 6.95 15.15 11.95 9.3 13.35 9.9 19.3 5.85 24 9.9 28.6 9.3 34.65 15.15 36.05Z"/></svg>`,
  },
  {
    title: "Security Champions Playbook",
    description: "Kun for ansatte",
    icon: `<svg class="w-7 h-7" width="48" height="48" viewBox="0 0 48 48" fill="none" focusable="false" aria-hidden="true"><path fill="currentColor" d="M24 44Q17 42.25 12.5 35.875Q8 29.5 8 21.9V10L24 4L40 10V21.9Q40 29.5 35.5 35.875Q31 42.25 24 44ZM24 40.9Q29.3 39.15 32.775 34.475Q36.25 29.8 36.85 24H24V7.25L11 12.1V21.9Q11 22.5 11.025 22.925Q11.05 23.35 11.15 24H24Z"/></svg>`,
  },
  {
    title: "Teknologiradar",
    description: "For for ansatte",
    icon: `<svg class="w-7 h-7" width="48" height="48" viewBox="0 0 48 48" fill="none" focusable="false" aria-hidden="true"><path fill="currentColor" d="M24 44Q19.85 44 16.2 42.425Q12.55 40.85 9.85 38.15Q7.15 35.45 5.575 31.8Q4 28.15 4 24Q4 19.85 5.575 16.2Q7.15 12.55 9.85 9.85Q12.55 7.15 16.2 5.575Q19.85 4 24 4Q28.15 4 31.8 5.575Q35.45 7.15 38.15 9.85Q40.85 12.55 42.425 16.2Q44 19.85 44 24Q44 28.15 42.425 31.8Q40.85 35.45 38.15 38.15Q35.45 40.85 31.8 42.425Q28.15 44 24 44ZM24 36Q19 36 15.5 32.5Q12 29 12 24Q12 19 15.5 15.5Q19 12 24 12Q29 12 32.5 15.5Q36 19 36 24Q36 26.1 35.325 27.95Q34.65 29.8 33.5 31.35L37.05 34.9Q38.9 32.65 39.95 29.9Q41 27.15 41 24Q41 16.9 36.05 11.95Q31.1 7 24 7Q16.9 7 11.95 11.95Q7 16.9 7 24Q7 31.1 11.95 36.05Q16.9 41 24 41Q27.15 41 29.925 39.975Q32.7 38.95 34.95 37.05L31.35 33.5Q29.8 34.65 27.95 35.325Q26.1 36 24 36ZM24 28Q22.35 28 21.175 26.825Q20 25.65 20 24Q20 22.35 21.175 21.175Q22.35 20 24 20Q25.65 20 26.825 21.175Q28 22.35 28 24Q28 24.4 27.9 24.8Q27.8 25.2 27.65 25.6L31.35 29.2Q32.15 28.1 32.575 26.775Q33 25.45 33 24Q33 20.25 30.375 17.625Q27.75 15 24 15Q20.25 15 17.625 17.625Q15 20.25 15 24Q15 27.75 17.625 30.375Q20.25 33 24 33Q25.45 33 26.775 32.575Q28.1 32.15 29.2 31.35L25.5 27.7Q25.15 27.85 24.775 27.925Q24.4 28 24 28Z"/></svg>`,
  },
]; */

const Portaler = () => {
  const logPortalCard = (e) =>
    logNav(
      "portal-kort",
      window.location.pathname,
      e.currentTarget.getAttribute("href")
    );

  return (
    <>
      <li>
        <NextLink href="/designsystem">
          <a
            onClick={(e) => logPortalCard(e)}
            className="group flex items-center gap-2 focus:shadow-focus-inverted focus:outline-none"
          >
            <div className="grid aspect-square w-12 shrink-0 place-items-center rounded-full bg-blue-400 group-hover:bg-white group-hover:text-deepblue-900">
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
              <Heading
                level="3"
                size="xsmall"
                className="group-hover:underline"
              >
                Designsystem
              </Heading>
              <Detail size="small" className="text-deepblue-100/95">
                Åpen for alle
              </Detail>
            </div>
          </a>
        </NextLink>
      </li>
      <li>
        <NextLink href="https://identitet.nav.no/">
          <a
            onClick={(e) => logPortalCard(e)}
            className=" group flex items-center gap-2 focus:shadow-focus-inverted focus:outline-none"
          >
            <div className="grid aspect-square w-12 shrink-0 place-items-center rounded-full bg-blue-400 group-hover:bg-white group-hover:text-deepblue-900">
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
                  d="M19.25 27.4 21.05 21.65 16.3 17.95H22.1L24 12L25.85 17.95H31.7L26.95 21.65L28.7 27.4L24 23.85ZM12.2 46V30.8Q9.95 28.45 8.975 25.65Q8 22.85 8 20Q8 13.2 12.6 8.6Q17.2 4 24 4Q30.8 4 35.4 8.6Q40 13.2 40 20Q40 22.85 39.025 25.65Q38.05 28.45 35.8 30.8V46L24 42.05ZM24 33Q29.45 33 33.225 29.225Q37 25.45 37 20Q37 14.55 33.225 10.775Q29.45 7 24 7Q18.55 7 14.775 10.775Q11 14.55 11 20Q11 25.45 14.775 29.225Q18.55 33 24 33ZM15.2 41.8 24 39.05 32.8 41.8V33.25Q30.8 34.7 28.5 35.35Q26.2 36 24 36Q21.8 36 19.5 35.35Q17.2 34.7 15.2 33.25ZM24 37.5Q24 37.5 24 37.5Q24 37.5 24 37.5Q24 37.5 24 37.5Q24 37.5 24 37.5Z"
                ></path>
              </svg>
            </div>
            <div className="">
              <Heading
                level="3"
                size="xsmall"
                className="group-hover:underline"
              >
                Identitet
              </Heading>
              <Detail size="small" className="text-deepblue-100/95">
                Åpen for alle
              </Detail>
            </div>
          </a>
        </NextLink>
      </li>
      <li>
        <NextLink href="https://sikkerhet.nav.no/">
          <a
            onClick={(e) => logPortalCard(e)}
            className="group flex items-center gap-2 focus:shadow-focus-inverted focus:outline-none"
          >
            <div className=" grid aspect-square w-12 shrink-0 place-items-center rounded-full  bg-blue-400  group-hover:bg-white group-hover:text-deepblue-900">
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
                  d="M24 44Q17 42.25 12.5 35.875Q8 29.5 8 21.9V10L24 4L40 10V21.9Q40 29.5 35.5 35.875Q31 42.25 24 44ZM24 40.9Q29.3 39.15 32.775 34.475Q36.25 29.8 36.85 24H24V7.25L11 12.1V21.9Q11 22.5 11.025 22.925Q11.05 23.35 11.15 24H24Z"
                ></path>
              </svg>
            </div>
            <div className="">
              <Heading
                level="3"
                size="xsmall"
                className="group-hover:underline"
              >
                Security Playbook
              </Heading>
              <Detail size="small" className="text-deepblue-100/95">
                Åpen for alle
              </Detail>
            </div>
          </a>
        </NextLink>
      </li>
      <li>
        <NextLink href="https://etterlevelse.intern.nav.no/">
          <a
            onClick={(e) => logPortalCard(e)}
            className="group flex items-center gap-2  focus:shadow-focus-inverted focus:outline-none"
          >
            <div className="border-400/20 grid aspect-square w-12 shrink-0 place-items-center rounded-full  bg-blue-400  group-hover:bg-white group-hover:text-deepblue-900">
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
                  d="M17.3 45 13.5 38.5 5.95 36.95 6.8 29.6 2 24 6.8 18.45 5.95 11.1 13.5 9.55 17.3 3 24 6.1 30.7 3 34.55 9.55 42.05 11.1 41.2 18.45 46 24 41.2 29.6 42.05 36.95 34.55 38.5 30.7 45 24 41.9ZM24 24ZM21.85 30.65 33.2 19.4 30.95 17.35 21.85 26.35 17.1 21.4 14.8 23.65ZM18.65 41.05 24 38.8 29.5 41.05 32.85 36.05 38.7 34.55 38.1 28.6 42.15 24 38.1 19.3 38.7 13.35 32.85 11.95 29.4 6.95 24 9.2 18.5 6.95 15.15 11.95 9.3 13.35 9.9 19.3 5.85 24 9.9 28.6 9.3 34.65 15.15 36.05Z"
                ></path>
              </svg>
            </div>
            <div className="">
              <Heading
                level="3"
                size="xsmall"
                className="group-hover:underline"
              >
                Etterlevelse
              </Heading>
              <Detail size="small" className="text-deepblue-100/95">
                Kun for ansatte
              </Detail>
            </div>
          </a>
        </NextLink>
      </li>
    </>
  );
};

const Page = ({ preview, tekster, temaer, bloggs }: PageProps): JSX.Element => {
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
      <div className="bg-deepblue-900">
        <AkselHeader variant="forside" />

        <main tabIndex={-1} id="hovedinnhold" className="focus:outline-none">
          <div className="relative bg-deepblue-900 bg-gradient-to-b from-deepblue-900 via-deepblue-900/50 to-deepblue-700 px-4 pt-16 pb-24 text-white">
            <div className="mx-auto max-w-aksel xs:w-[90%]">
              <div className="gap-6 lg:grid lg:grid-cols-3">
                <div className="max-w-prose pr-6 lg:col-span-2">
                  <Heading level="1" size="xlarge">
                    {tekster.title}
                  </Heading>
                  <div className="mt-6 text-deepblue-100/95">
                    <SanityBlockContent blocks={tekster.beskrivelse} />
                  </div>
                </div>
                <div className="mt-12 md:mt-4">
                  <Heading
                    level="2"
                    size="xsmall"
                    className="uppercase tracking-widest text-white"
                  >
                    Portaler
                  </Heading>
                  <nav aria-label="Side-portaler" className="mt-3">
                    <ul className="grid grid-flow-row justify-items-start gap-4 sm:w-fit sm:grid-cols-2 lg:grid-cols-1">
                      <Portaler />
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Temaseksjon */}
          {temaer && temaer.length > 0 && (
            <section className="relative bg-deepblue-50 px-4 pt-16 pb-24">
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
              <div className="relative z-10 mx-auto -mt-20 max-w-aksel xs:w-[90%]">
                <Heading
                  level="2"
                  size="small"
                  className="uppercase text-text-inverted"
                >
                  Temaer
                </Heading>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                  {/* Temakort */}
                  {temaer.slice(0, 7).map((tema) => (
                    <TemaCard {...tema} key={tema._id} />
                  ))}
                </div>
                {temaer.length > 6 && (
                  <NextLink href="/tema">
                    <a className="mt-6 inline-block text-text underline hover:text-deepblue-700 hover:no-underline">
                      Utforsk alle temaer
                    </a>
                  </NextLink>
                )}
              </div>
            </section>
          )}

          {/* Prinsipper */}
          {hasPrinsipp1 && (
            <section className="bg-deepblue-50 px-4 pt-0 pb-32 lg:pt-12">
              <div className="relative z-10 mx-auto max-w-aksel xs:w-[90%]">
                <div className="lg:grid lg:grid-flow-row-dense lg:gap-x-8">
                  <div className="lg:order-1 lg:col-start-2 lg:row-start-1 lg:-mb-8 lg:-mt-12">
                    <img
                      className="mx-auto max-w-xs sm:w-full lg:mx-auto lg:max-w-md"
                      src="/images/prinsipper.webp"
                      width="800"
                      alt=""
                    />
                  </div>
                  <div className="self-end">
                    <div className="max-w-prose">
                      <h2 className="mt-4 text-2xl font-semibold tracking-tight lg:mt-auto lg:text-4xl">
                        Prinsipper for brukeropplevelse
                      </h2>
                      <SanityBlockContent
                        className="mt-3"
                        blocks={tekster.prinsipp_1?.beskrivelse}
                      />
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2 lg:max-w-4xl lg:gap-3">
                      {tekster.prinsipp_1.undersider.map((x) => (
                        <NextLink
                          href={x.slug.current}
                          passHref
                          key={x.slug.current}
                        >
                          <a className="flex w-full items-center justify-between gap-4 rounded-md bg-white px-6 py-4 leading-tight shadow transition ease-out hover:bg-deepblue-200/60 hover:shadow-md sm:w-auto">
                            <span className="font-semibold">{x.heading}</span>{" "}
                            <Next
                              className="-mr-1 sm:hidden"
                              aria-hidden
                              aria-label="Gå til siden"
                            />{" "}
                          </a>
                        </NextLink>
                      ))}
                    </div>
                    <Link
                      className="mt-6 inline-block text-gray-800"
                      href={`/${tekster.prinsipp_1.hovedside.slug.current}`}
                    >
                      Utforsk alle prinsippene
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

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
              <div className="gap-6 2xl:grid 2xl:grid-cols-3 2xl:items-start">
                {/* Redaksjons-kort */}
                <div className="mx-auto grid max-w-lg  rounded-lg shadow 2xl:sticky 2xl:top-24">
                  <div className="rounded-t-lg bg-deepblue-700 px-6 py-6 text-white">
                    <Heading size="medium" level="2">
                      Aksel trenger deg!
                    </Heading>
                    <BodyLong className="mt-1 max-w-prose">
                      Vi trenger hjelp med å lage innhold til Aksel. Har du
                      ideer, mulighet til å skrive eller lurer på noe om
                      produktutvikling?
                    </BodyLong>
                  </div>
                  <a
                    className="group flex items-center justify-between rounded-b-lg bg-deepblue-300/60 px-6 py-4 leading-snug hover:bg-deepblue-200 hover:underline focus:rounded-lg focus:shadow-focus focus:outline-none"
                    href="https://nav-it.slack.com/archives/C0370ADS0HX"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>
                      Ta kontakt med{" "}
                      <span className="font-semibold">#aksel</span> på Slack
                    </span>
                  </a>
                </div>
                {/* Blogg */}
                {bloggs && bloggs.length > 0 && (
                  <div className="order-1 mt-16 xl:pl-12 2xl:col-span-2 2xl:mt-44">
                    <Heading
                      level="2"
                      size="xsmall"
                      className="uppercase tracking-widest"
                    >
                      Bloggen
                    </Heading>
                    <div className="mt-1 divide-y divide-gray-200">
                      {/* Blogg-kort */}
                      {bloggs.slice(0, 7).map((blog) => (
                        <BloggCard key={blog._id} blog={blog} />
                      ))}
                    </div>
                    {bloggs?.length > 6 && (
                      <NextLink href="/blogg" passHref>
                        <a
                          className="mt-6 inline-block text-text underline hover:text-deepblue-700 hover:no-underline"
                          href="#"
                        >
                          Flere bloggposter
                        </a>
                      </NextLink>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer variant="aksel" />
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
  const client = getClient(preview);

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
