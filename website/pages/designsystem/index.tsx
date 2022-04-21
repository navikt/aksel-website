import { BodyLong, Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import {
  Card,
  DsFrontpageFooterIllustration,
  DsFrontpageIllustration,
  PreviewBanner,
} from "../../components";
import Footer from "../../components/layout/footer/Footer";
import DesignsystemHeader from "../../components/layout/header/DesignsystemHeader";
import { SanityBlockContent } from "../../components/SanityBlockContent";
import {
  DsFrontpage,
  DsFrontPageCardT,
  dsFrontpageQuery,
  DsNavigation,
} from "../../lib";
import { getClient } from "../../lib/sanity/sanity.server";

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
      <DesignsystemHeader />
      {props.preview && <PreviewBanner />}

      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="relative flex justify-center bg-component-background-alternate focus:outline-none"
      >
        <div className="flex min-h-screen-header w-full flex-col items-center">
          <div className="relative flex w-full justify-center bg-canvas-background-light">
            <div className="flex w-full max-w-aksel-max-w">
              <div className="flex w-full max-w-[calc(1440px_-_624px)] flex-col items-center py-12 px-4 md:block md:h-[240px] md:py-16 md:px-12">
                <Heading spacing level="1" size="xlarge">
                  Designsystemet
                </Heading>
                <BodyLong>Gjør det enkelt å lage produkter i NAV</BodyLong>
              </div>
              <DsFrontpageIllustration className="hidden h-[240px] w-[624px] shrink-0 xl:block" />
            </div>
          </div>

          <div className="flex w-full max-w-aksel-max-w flex-col flex-wrap bg-component-background-alternate">
            <div className="reduced-spacing py-12 px-4 md:px-12 md:py-6">
              {props?.page?.body && (
                <SanityBlockContent blocks={props?.page?.body} />
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-6 px-4 pt-0 pb-12 md:justify-start md:px-12 md:pb-16">
              {props?.page?.cards &&
                props?.page?.cards.map((card, i) => {
                  return (
                    <Card
                      key={card._key}
                      node={card as unknown as DsFrontPageCardT}
                      tag={true}
                      style={{ animationDelay: `${i * 50}ms` }}
                      className={`animate-fadeInBottom opacity-0`}
                    />
                  );
                })}
            </div>
          </div>
          <DsFrontpageFooterIllustration className="flex h-full w-full lg:hidden" />
        </div>
      </main>
      <Footer />
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
      preview,
    },
    revalidate: 10,
  };
};

export default Page;
