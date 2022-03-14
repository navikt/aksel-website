import { Office1, Star, System } from "@navikt/ds-icons";
import { BodyLong, Heading, Label } from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { logNav, PreviewBanner, TemaCard } from "../components";
import Footer from "../components/layout/footer/Footer";
import AkselHeader from "../components/layout/header/AkselHeader";
import { SanityBlockContent } from "../components/SanityBlockContent";
import { akselForsideQuery, AkselTema, akselTema, Riktekst } from "../lib";
import { getClient } from "../lib/sanity/sanity.server";

const Page = ({ preview, temaer, tekster }: PageProps): JSX.Element => {
  const logPortalCard = (e) =>
    logNav(
      "portal-kort",
      window.location.pathname,
      e.currentTarget.getAttribute("href")
    );

  /* const getQuote = () =>
    quotes.quotes &&
    quotes.quotes[new Date().getMinutes() % quotes.quotes.length];

  const quote = getQuote(); */

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
      <div className="aksel-layout-x flex w-full flex-col items-center justify-center pb-24">
        <Heading
          level="1"
          size="xlarge"
          spacing
          className="w-full max-w-text sm:text-left"
        >
          {tekster.title}
        </Heading>
        <SanityBlockContent
          blocks={tekster.beskrivelse}
          /* className="text-center" */
        />
        {/* {quote && (
          <>
            <BodyShort lang="en" className="mb-2 text-center sm:text-left">
              “{quote.title}”
            </BodyShort>
            <BodyShort lang="en" size="small" className="text-text-muted">
              {quote.kilde}
            </BodyShort>
          </>
        )} */}

        {/* <Search full /> */}
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
              className="flex w-full items-center gap-3 rounded bg-white px-4 py-3 shadow-small hover:underline focus:shadow-focus focus:outline-none lg:w-auto"
              onClick={(e) => logPortalCard(e)}
            >
              <Star className="shrink-0 text-[1.5rem]" aria-hidden />
              Security playbook
            </Label>
          </NextLink>
        </nav>
      </div>
      {temaer && (
        <div className="aksel-layout-x flex w-full max-w-7xl flex-col gap-8 py-24">
          <Heading level="2" size="large">
            Siste temaer
          </Heading>

          <nav aria-label="Temasider" className="aksel-card-grid">
            {temaer.map((tema) => (
              <TemaCard {...tema} key={tema._id} />
            ))}
          </nav>
        </div>
      )}
      <div className="aksel-layout-x flex w-full justify-center">
        <div className="flex w-full max-w-2xl flex-col items-center justify-between gap-4 rounded-2xl bg-gray-800 py-6 px-7 text-text-inverted sm:py-12 sm:pl-14 md:flex-row md:gap-0 md:pl-7">
          <div className="">
            <Heading size="large" level="2" spacing>
              Redaksjonen trenger deg!
            </Heading>
            <BodyLong>
              Vi trenger hjelp til å skrive innhold til Aksel. Har du ideer,
              mulighet til å skrive eller lurer på noe angående innhold? Ta
              kontakt med oss på Slack.
            </BodyLong>
          </div>
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
  tekster: { title?: string; beskrivelse?: Riktekst };
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
  const tekster = await getClient(preview).fetch(akselForsideQuery);

  return {
    props: {
      temaer,
      tekster,
      slug: "/",
      preview,
    },
    revalidate: 30,
  };
};

export default Page;
