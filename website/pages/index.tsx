import { BodyShort, Heading, Ingress, Label, Link } from "@navikt/ds-react";
import Head from "next/head";
import React, { useEffect } from "react";
import {
  AmplitudeEvents,
  Card,
  NAVLogoDark,
  PreviewBanner,
  useAmplitude,
} from "../components";
import Footer from "../components/layout/footer/Footer";
import AkselHeader from "../components/layout/header/AkselHeader";
import { VkFrontpage, vkFrontpageQuery } from "../lib";
import { getClient } from "../lib/sanity/sanity.server";
import NextLink from "next/link";
import { Locked, Office1, Star, System, SystemFilled } from "@navikt/ds-icons";
import cl from "classnames";

const Page = (props: { page: VkFrontpage; preview: boolean }): JSX.Element => {
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
      {props.preview && <PreviewBanner />}
      <div className="flex h-[700px] w-screen justify-center bg-blue-50">
        Placeholder
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
        className="relative flex min-h-screen w-full flex-col pb-8 pt-12 md:py-12"
      >
        {page}
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}) => {
  const page = await getClient(preview).fetch(vkFrontpageQuery);
  const doc = page?.[0] ?? null;

  return {
    props: {
      page: doc,
      slug: "/",
      preview,
    },
    revalidate: 10,
  };
};

export default Page;
