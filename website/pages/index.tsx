import { Locked, Office1, Right, Star, SystemFilled } from "@navikt/ds-icons";
import { BodyShort, Heading, Label, Link } from "@navikt/ds-react";
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
      <div className="forside--padding-x flex w-screen max-w-6xl flex-col items-center justify-center pb-16">
        <Heading level="1" size="xlarge" className="mb-8">
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
        <div className="mx-auto  flex flex-col flex-wrap items-center gap-4 whitespace-nowrap lg:flex-row">
          <NextLink href="/designsystem" passHref>
            <Label
              as="a"
              className="flex w-full items-center gap-3 rounded bg-white px-4 py-2 shadow-card outline-2 hover:underline focus:shadow-focus focus:outline-none lg:w-auto"
            >
              <SystemFilled className="shrink-0 text-[2rem]" /> Designsystemet
            </Label>
          </NextLink>
          <NextLink href="https://identitet.nav.no" passHref>
            <Label
              as="a"
              className="flex w-full items-center gap-3 rounded bg-white px-4 py-2 shadow-card hover:underline focus:shadow-focus focus:outline-none lg:w-auto"
            >
              <Office1 className="shrink-0 text-[2rem]" />
              Identitet
            </Label>
          </NextLink>

          <NextLink href="https://sikkerhet.nav.no" passHref>
            <Label
              as="a"
              className={cl(
                "relative flex w-full items-center gap-3 rounded bg-white py-2 pr-10 pl-4 shadow-card hover:underline focus:shadow-focus focus:outline-none lg:w-auto"
              )}
            >
              <Star className="shrink-0 text-[2rem]" />
              Security playbook
              <span className="absolute right-0 flex h-full items-center rounded-r bg-gray-500 px-1 text-text-inverted">
                <Locked />
              </span>
            </Label>
          </NextLink>
        </div>
      </div>
      {temaer && (
        <div className="forside--padding-x flex w-full max-w-6xl flex-col gap-6 py-24">
          <span className="flex flex-col gap-x-12 gap-y-2 sm:flex-row sm:items-end">
            <Heading level="2" size="large">
              Siste temaer
            </Heading>
            <NextLink href="/tema" passHref>
              <Link className="svg-color-reset text-text">
                Utforsk alle temaene <Right />
              </Link>
            </NextLink>
          </span>
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

                <Right className=" absolute right-4 bottom-4 -rotate-45" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <div className="w-full bg-component-background-alternate">
      <AkselHeader />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="relative flex min-h-screen w-full flex-col items-center py-12 focus:outline-none md:py-16"
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
