import { BodyLong, Heading } from "@navikt/ds-react";
import Head from "next/head";
import React, { useEffect } from "react";
import {
  AmplitudeEvents,
  Card,
  DsFrontpageFooterIllustration,
  DsFrontpageIllustration,
  PreviewBanner,
  SkipLink,
  useAmplitude,
} from "../../components";
import DesignsystemFooter from "../../components/layout/footer/DesignsystemFooter";
import DesignsystemHeader from "../../components/layout/header/DesignsystemHeader";
import { SanityBlockContent } from "../../components/SanityBlockContent";
import {
  DsFrontpage,
  DsFrontPageCardT,
  dsFrontpageQuery,
  DsNavigation,
  dsNavigationQuery,
  getClient,
} from "../../lib";

const Page = (props: {
  page: DsFrontpage;
  navigation: DsNavigation;
  preview: boolean;
}): JSX.Element => {
  const { logAmplitudeEvent } = useAmplitude();

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: "/designsystem",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Designsystemet</title>
        <meta property="og:title" content="Designsystemet NAV" />
        <meta
          name="description"
          content="Gjør det enkelt å lage produkter i NAV."
        />
      </Head>
      {props.preview && <PreviewBanner />}

      <div className="relative flex w-full bg-canvas-background-light">
        <div className="flex flex-col items-center md:block w-full md:h-[240px] py-12 px-4 md:py-16 md:px-12 max-w-[calc(1440px_-_624px)]">
          <Heading spacing level="1" size="2xlarge">
            Designsystemet
          </Heading>
          <BodyLong>Gjør det enkelt å lage produkter i NAV</BodyLong>
        </div>
        <DsFrontpageIllustration className="h-[240px] w-[624px] shrink-0 hidden xl:block" />
      </div>
      <div className="flex flex-col flex-wrap max-w-screen-2xl bg-component-background-alternate">
        <div className="reduced-spacing py-12 px-4 md:px-12 md:py-6">
          {props?.page?.body && (
            <SanityBlockContent blocks={props?.page?.body} />
          )}
        </div>
        <div className="flex flex-wrap gap-6 pt-0 px-4 pb-12 md:px-12 md:pb-16 justify-center md:justify-start">
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
      <DsFrontpageFooterIllustration className="w-full h-full flex lg:hidden" />
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <SkipLink href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </SkipLink>
      <DesignsystemHeader />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="relative min-h-header w-full flex flex-col focus:outline-none bg-component-background-alternate"
      >
        {page}
      </main>
      <DesignsystemFooter />
    </>
  );
};

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}) => {
  const client = getClient(preview);

  let page = await client.fetch(dsFrontpageQuery);
  page = page?.find((item) => item._id.startsWith(`drafts.`)) || page?.[0];

  const navigation = await getClient(false).fetch(dsNavigationQuery);

  return {
    props: {
      page: page ?? null,
      slug: "/designsystem",
      validPath: true,
      isDraft: false,
      navigation,
      preview,
    },
    revalidate: 10,
  };
};

export default Page;
