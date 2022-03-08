import { Locked, Office1, Star, System } from "@navikt/ds-icons";
import { BodyLong, BodyShort, Heading, Label } from "@navikt/ds-react";
import cl from "classnames";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { logNav, PreviewBanner, Search, TemaCard } from "../components";
import { PointingFingerIllustrasjon } from "../components/assets/PointingFinger";
import Footer from "../components/layout/footer/Footer";
import AkselHeader from "../components/layout/header/AkselHeader";
import { AkselTema, akselTema } from "../lib";
import { getClient } from "../lib/sanity/sanity.server";

const Page = ({ preview, temaer }: PageProps): JSX.Element => {
  const logPortalCard = (e) =>
    logNav(
      "portal-kort",
      window.location.pathname,
      e.currentTarget.getAttribute("href")
    );

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
      <div className="aksel-layout-x flex flex-col items-center justify-center pb-24">
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

      <div className="flex w-full justify-center bg-gray-200 py-8">
        <nav
          aria-label="Portaler til NAV-sider"
          className="aksel-layout-x mx-auto flex flex-col items-center gap-4 whitespace-nowrap sm:flex-row"
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
              className={cl(
                "relative flex w-full items-center gap-3 rounded bg-white py-3 pr-10 pl-4 shadow-small hover:underline focus:shadow-focus focus:outline-none lg:w-auto"
              )}
              onClick={(e) => logPortalCard(e)}
            >
              <Star className="shrink-0 text-[1.5rem]" aria-hidden />
              Security playbook
              <span className="absolute right-0 flex h-full items-center rounded-r bg-gray-500 px-1 text-text-inverted">
                <span className="navds-sr-only">
                  Siden ligger bak innlogging
                </span>
                <Locked aria-hidden />
              </span>
            </Label>
          </NextLink>
        </nav>
      </div>
      {temaer && (
        <div className="aksel-layout-x flex w-full max-w-7xl flex-col gap-8 py-24">
          <Heading level="2" size="xlarge">
            Siste temaer
          </Heading>

          <nav aria-label="Temasider" className="aksel-card-grid">
            {temaer.map((tema) => (
              <TemaCard {...tema} key={tema._id} />
            ))}
          </nav>
        </div>
      )}
      <div className="aksel-layout-x">
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
          <PointingFingerIllustrasjon
            aria-hidden
            aria-label="Finger som peker mot deg"
            className="mr-0 ml-5 flex-shrink-0 sm:ml-10 lg:mr-14"
          />
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
        className="relative flex min-h-screen-header w-full flex-col items-center py-16 focus:outline-none md:py-24"
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
