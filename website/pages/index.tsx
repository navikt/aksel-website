import { BodyShort, Heading, Ingress, Link } from "@navikt/ds-react";
import Head from "next/head";
import React, { useEffect } from "react";
import {
  AmplitudeEvents,
  Card,
  NAVLogoDark,
  PreviewBanner,
  useAmplitude,
} from "../components";
import FrontpageFooter from "../components/layout/footer/FrontpageFooter";
import { getClient, VkFrontpage, vkFrontpageQuery } from "../lib";

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
        <title>Verktøykassa</title>
        <meta property="og:title" content="Verktøykassa - NAV" />
        <meta
          name="description"
          content="En samling ressurser fra ulike fagdisipliner som hjelper oss å skape bedre, universelt tilgjengelige og sammenhengende produkter i NAV."
        />
      </Head>
      {props.preview && <PreviewBanner />}

      <Link
        href="https://old-design-nav.vercel.app/"
        className="absolute top-4 flex w-[calc(100%_-_2rem)] justify-center text-text md:top-8 md:left-8 md:block md:w-auto"
      >
        Gå til gammel dokumentasjon
      </Link>
      <div className="mx-auto my-0 flex max-w-screen-lg flex-col items-center justify-center text-center">
        <div className="sub mb-0 flex items-center md:mb-12">
          <NAVLogoDark className="justify-self-center text-heading-xlarge" />
        </div>
        <Heading spacing level="1" size="2xlarge" className="relative w-fit">
          Verktøykassa
          <BodyShort className="absolute right-0 top-0 translate-x-full md:-right-2">
            Beta
          </BodyShort>
        </Heading>
        <Ingress>
          En samling ressurser fra ulike fagdisipliner som hjelper oss å skape
          bedre, universelt tilgjengelige og sammenhengende produkter i NAV.
        </Ingress>
      </div>
      <nav className="mx-auto mt-16 mb-0" aria-label="Portal navigasjon">
        <div className="card-grid-flow list-none gap-6 p-0">
          {props?.page?.cards &&
            props.page.cards
              .filter((x) => !x.locked)
              .map((card) => (
                <Card
                  key={card._key}
                  node={card}
                  categoryRef={card.category_ref}
                  href={
                    card.internal
                      ? `/${
                          card.link
                            ?.split("design.nav.no/")
                            ?.slice(1)
                            ?.join("/") ?? card.link
                        }`
                      : card.link
                  }
                />
              ))}
        </div>
        {props?.page?.cards &&
          props.page.cards.filter((x) => x.locked).length > 0 && (
            <>
              <Heading level="2" size="small" className="mb-8 mt-24">
                Krever innlogging
              </Heading>
              <div className="card-grid-flow list-none gap-6 p-0">
                {props.page.cards
                  .filter((x) => x.locked)
                  .map((card) => (
                    <Card
                      key={card._key}
                      node={card}
                      categoryRef={card.category_ref}
                      href={
                        card.internal
                          ? `/${
                              card.link
                                ?.split("design.nav.no/")
                                ?.slice(1)
                                ?.join("/") ?? card.link
                            }`
                          : card.link
                      }
                    />
                  ))}
              </div>
            </>
          )}
      </nav>
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <div className="flex w-full flex-col bg-component-background-alternate">
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="relative flex min-h-screen w-full flex-col px-4 pb-8 pt-12 md:py-12"
      >
        {page}
      </main>
      <FrontpageFooter />
    </div>
  );
};

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}) => {
  const client = getClient(preview);

  let page = await client.fetch(vkFrontpageQuery);
  page = page?.find((item) => item._id.startsWith(`drafts.`)) || page?.[0];

  return {
    props: {
      page: page ?? null,
      slug: "/",
      validPath: true,
      isDraft: false,
      preview,
    },
    revalidate: 10,
  };
};

export default Page;
