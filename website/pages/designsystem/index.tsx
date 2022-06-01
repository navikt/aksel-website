import {
  DsCard,
  DsFrontpageFooterIllustration,
  DsFrontpageIllustration,
  PreviewBanner,
} from "@/components";
import { DsHeader, Footer } from "@/layout";
import {
  DsFrontpage,
  DsFrontPageCardT,
  dsFrontpageQuery,
  DsNavigation,
} from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { BodyLong, Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { getClient } from "@/sanity-client";

const Page = (props: {
  page: DsFrontpage;
  navigation: DsNavigation;
  preview: boolean;
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>Designsystemet</title>
        <meta property="og:title" content="Designsystemet NAV" />
        <meta
          name="description"
          content="Desgnsystemet til NAV gjør det enkelt å lage produkter."
        />
      </Head>
      <DsHeader />
      {props.preview && <PreviewBanner />}

      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="relative flex justify-center bg-component-background-alternate focus:outline-none"
      >
        <div className="flex min-h-screen-header w-full flex-col items-center">
          <div className="relative flex w-full justify-center bg-canvas-background-light">
            <div className="flex w-full max-w-screen-2xl">
              <div className="flex w-full max-w-[calc(1440px_-_624px)] flex-col items-center py-12 px-4 xs:block xs:h-[240px] xs:py-16 xs:px-12">
                <Heading spacing level="1" size="xlarge">
                  Designsystemet
                </Heading>
                <BodyLong>Gjør det enkelt å lage produkter i NAV</BodyLong>
              </div>
              <DsFrontpageIllustration className="hidden h-[240px] w-[624px] shrink-0 lg:block" />
            </div>
          </div>

          <div className="flex w-full max-w-screen-2xl flex-col flex-wrap bg-component-background-alternate">
            <div className="reduced-spacing mx-auto w-[90%] py-12 xs:w-full xs:px-12 xs:py-6">
              {props?.page?.body && (
                <SanityBlockContent blocks={props?.page?.body} />
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-6 px-4 pt-0 pb-12 xs:justify-start xs:px-12 xs:pb-16">
              {props?.page?.cards &&
                props?.page?.cards.map((card) => {
                  return (
                    <DsCard
                      key={card._key}
                      node={card as unknown as DsFrontPageCardT}
                      tag={true}
                    />
                  );
                })}
            </div>
          </div>
          <DsFrontpageFooterIllustration className="flex h-full w-full md:hidden" />
        </div>
      </main>
      <Footer variant="ds" />
    </>
  );
};

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}) => {
  const { page, nav } = await getClient(preview).fetch(dsFrontpageQuery);
  const doc = page?.[0] ?? null;

  return {
    props: {
      page: doc,
      slug: "/designsystem",
      navigation: nav,
      activeHeading: null,
      preview,
    },
    revalidate: 60,
  };
};

export default Page;
