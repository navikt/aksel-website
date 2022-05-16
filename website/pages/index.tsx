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
    <div className="flex w-full max-w-2xl flex-col items-center justify-between gap-4 rounded-2xl bg-gray-800 py-6 px-7 text-text-inverted sm:py-12 sm:pl-14 md:flex-row md:gap-0 md:pl-7">
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
        <AkselHeader />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="relative flex min-h-screen-header w-full flex-col items-center py-16 focus:outline-none md:py-24"
        >
          <div className="aksel-layout-x flex w-full flex-col items-center justify-center pb-24">
            <Heading
              level="1"
              size="xlarge"
              spacing
              className="w-full max-w-text sm:text-left"
            >
              {tekster.title}
            </Heading>
            <SanityBlockContent blocks={tekster.beskrivelse} />
          </div>

          <div className="flex w-full justify-center bg-gray-200 py-8">
            <nav
              aria-label="Portaler til NAV-sider"
              className="mx-auto flex flex-col gap-4 whitespace-nowrap xl:flex-row"
            >
              <NextLink href="/designsystem" passHref>
                <Label
                  as="a"
                  className="flex w-full items-center gap-3 rounded bg-white px-4 py-3 shadow-small outline-2 hover:underline focus:shadow-focus focus:outline-none lg:w-auto"
                  onClick={(e) => logPortalCard(e)}
                >
                  <System className="shrink-0 text-[1.5rem]" aria-hidden />
                  Designsystemet
                </Label>
              </NextLink>
              <NextLink href="https://identitet.nav.no" passHref>
                <Label
                  as="a"
                  className="flex w-full items-center gap-3 rounded bg-white px-4 py-3 shadow-small hover:underline focus:shadow-focus focus:outline-none lg:w-auto"
                  onClick={(e) => logPortalCard(e)}
                >
                  <Office1 className="shrink-0 text-[1.5rem]" aria-hidden />
                  Identitet
                </Label>
              </NextLink>

              <NextLink href="https://sikkerhet.nav.no" passHref>
                <Label
                  as="a"
                  className="flex w-full items-center gap-3 rounded bg-white px-4 py-3 shadow-small hover:underline focus:shadow-focus focus:outline-none lg:w-auto"
                  onClick={(e) => logPortalCard(e)}
                >
                  <Star className="shrink-0 text-[1.5rem]" aria-hidden />
                  Security playbook
                </Label>
              </NextLink>

              <Tooltip
                content="Siden er bak innlogging for NAV ansatte"
                placement="right"
              >
                <Label
                  as="a"
                  href="https://etterlevelse.intern.nav.no/"
                  className="relative flex w-full items-center gap-3 rounded bg-white px-4 py-3 pr-10 shadow-small hover:underline focus:shadow-focus focus:outline-none lg:w-auto"
                  onClick={(e) => logPortalCard(e)}
                >
                  <Task className="shrink-0 text-[1.5rem]" aria-hidden />
                  Etterlevelse
                  <span className="absolute right-0 flex h-full items-center justify-center rounded-r bg-gray-500 px-1">
                    <Locked
                      aria-label="Siden er bak innlogging for NAV ansatte"
                      className="text-white"
                    />
                  </span>
                </Label>
              </Tooltip>
            </nav>
          </div>

          {temaer && temaer.length > 0 && (
            <div className="aksel-layout-x flex w-full flex-col gap-6 py-24">
              <Heading level="2" size="medium">
                Temaer
              </Heading>

              <nav aria-label="Temasider" className="aksel-card-grid">
                {temaer.map((tema) => (
                  <TemaCard {...tema} key={tema._id} />
                ))}
              </nav>
            </div>
          )}

          {hasPrinsipp1 && (
            <div className="mb-24 flex w-full justify-center bg-gray-200 py-16">
              <div className="aksel-layout-x flex w-full max-w-3xl flex-col  justify-center">
                <Heading
                  level="1"
                  size="large"
                  spacing
                  className="w-full max-w-text sm:text-left"
                >
                  Prinsipper for brukeropplevelse
                </Heading>
                <SanityBlockContent blocks={tekster.prinsipp_1.beskrivelse} />
                <div className="flex flex-wrap gap-4">
                  {tekster.prinsipp_1.undersider &&
                    tekster.prinsipp_1.undersider
                      .filter((x) => !!x)
                      .map((x) => (
                        <NextLink
                          key={x.heading}
                          href={x?.slug?.current}
                          passHref
                        >
                          <Label
                            as="a"
                            className="flex items-center justify-center gap-2 rounded bg-white px-6 py-3 pr-3 shadow-small hover:underline focus:shadow-focus focus:outline-none "
                          >
                            {x?.heading}
                            <Next className="h-6 w-6" />
                          </Label>
                        </NextLink>
                      ))}
                </div>
                <NextLink
                  href={tekster.prinsipp_1?.hovedside?.slug?.current ?? "#"}
                  passHref
                >
                  <Link className="svg-color-reset mt-6 flex items-center justify-center gap-1 self-start text-text">
                    Oversikt over alle prinsippene
                    <Next
                      className="h-4 w-4 text-text"
                      aria-hidden
                      aria-label="Gå til siden"
                    />
                  </Link>
                </NextLink>
              </div>
            </div>
          )}

          {bloggs && bloggs.length > 0 && (
            <div className="aksel-layout-x flex w-full flex-col gap-6 pb-24">
              <Heading level="2" size="medium">
                Blogg
              </Heading>

              <nav aria-label="Temasider" className="aksel-card-grid">
                {bloggs.map((blogg) => (
                  <ArtikkelCard {...blogg} key={blogg._id} source="blogg" />
                ))}
              </nav>
            </div>
          )}

          <RedaksjonsKort />
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
    revalidate: 30,
  };
};

export default Page;
