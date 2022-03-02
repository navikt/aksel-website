import { Locked, Office1, Right, Star, SystemFilled } from "@navikt/ds-icons";
import { BodyShort, Heading, Label, Link } from "@navikt/ds-react";
import cl from "classnames";
import Head from "next/head";
import NextLink from "next/link";
import React, { useEffect } from "react";
import {
  AmplitudeEvents,
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
      <div className="flex w-screen max-w-6xl flex-col items-center justify-center pb-16">
        <Heading level="1" size="xlarge" className="mb-8">
          Produktutvikling i praksis
        </Heading>
        <div className="mb-8">
          <BodyShort className="mb-2">
            “The fast parts learn, the slow parts remember”
          </BodyShort>
          <BodyShort size="small" className="text-text-muted">
            - Stewart Brand
          </BodyShort>
        </div>
        <Search full />
      </div>
      <div className="flex h-28 w-full items-center justify-center gap-4 bg-gray-200">
        <NextLink href="/designsystem" passHref>
          <Label
            as="a"
            className="flex items-center gap-3 rounded bg-white px-4 py-2 shadow-card outline-2 hover:underline focus:shadow-focus focus:outline-none"
          >
            <SystemFilled className="text-[2rem]" /> Designsystemet
          </Label>
        </NextLink>
        <NextLink href="https://identitet.nav.no" passHref>
          <Label
            as="a"
            className="flex items-center gap-3 rounded bg-white px-4 py-2 shadow-card hover:underline focus:shadow-focus focus:outline-none"
          >
            <Office1 className="text-[2rem]" />
            Identitet
          </Label>
        </NextLink>

        <NextLink href="https://sikkerhet.nav.no" passHref>
          <Label
            as="a"
            className={cl(
              "relative flex items-center gap-3 rounded bg-white px-4 py-2 shadow-card hover:underline focus:shadow-focus focus:outline-none",
              { "pr-10": true }
            )}
          >
            <Star className="text-[2rem]" />
            Security playbook
            <span className="absolute right-0 flex h-full items-center rounded-r bg-gray-500 px-1 text-text-inverted">
              <Locked />
            </span>
          </Label>
        </NextLink>
      </div>
      {temaer && (
        <div className="flex w-full max-w-6xl flex-col gap-6 pt-24">
          <span className="flex items-end gap-x-12 gap-y-2">
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
                <NextLink
                  href={`/tema/${tema.tag
                    .toLowerCase()
                    .trim()
                    .replaceAll(" ", "")}`}
                  passHref
                >
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
        className="relative flex min-h-screen w-full flex-col items-center pb-16 pt-16 focus:outline-none md:py-12"
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
