import { BodyShort, Heading, Ingress, Link } from "@navikt/ds-react";
import Head from "next/head";
import React, { useEffect } from "react";
import * as Sc from "../components";
import {
  AmplitudeEvents,
  Card,
  NAVLogoDark,
  useAmplitude,
} from "../components";
import FrontpageFooter from "../components/layout/footer/FrontpageFooter";
import { getClient, vkFrontpageQuery, VkFrontpage } from "../lib";

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
        <meta property="og:title" content="Verktøykassen NAV" />
        <meta
          name="description"
          content="En samling ressurser fra ulike fagdisipliner som hjelper oss å skape bedre, universelt tilgjengelige og sammenhengende produkter i NAV."
        />
        <meta
          name="google-site-verification"
          content="gBKU9VILlx0pOK3eFKR08WsCdYjWJqM26b5LS-eVgOI"
        />
      </Head>
      {props.preview && <Sc.PreviewBanner />}
      <div className="relative">
        <div className="px-4 py-8 md:p-12 min-h-screen w-full flex flex-col bg-component-background-alternate">
          <Link
            href="https://old-design-nav.vercel.app/"
            className="absolute top-4 md:top-8 md:left-8 text-text"
          >
            Gå til gammel dokumentasjon
          </Link>
          <div className="mx-auto my-0 flex flex-col justify-center items-center max-w-screen-lg text-center">
            <div className="flex items-center mb-0 md:mb-12 sub">
              <NAVLogoDark className="justify-self-center text-heading-xlarge" />
            </div>
            <Heading
              spacing
              level="1"
              size="2xlarge"
              className="relative w-fit"
            >
              Verktøykassa
              <BodyShort className="absolute right-0 top-0 md:-right-2 translate-x-full">
                Beta
              </BodyShort>
            </Heading>
            <Ingress>
              En samling ressurser fra ulike fagdisipliner som hjelper oss å
              skape bedre, universelt tilgjengelige og sammenhengende produkter
              i NAV.
            </Ingress>
          </div>
          <nav className="mt-16 mb-0 mx-auto" aria-label="Portal navigasjon">
            <div className="card-grid-flow gap-6 p-0 list-none">
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
                  <div className="card-grid-flow gap-6 p-0 list-none">
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
        </div>
      </div>
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <Sc.SidebarMain>
      <Sc.MainFooter>
        <Sc.Main fullwidth tabIndex={-1} id="hovedinnhold" graybg>
          {page}
        </Sc.Main>
        <FrontpageFooter />
      </Sc.MainFooter>
    </Sc.SidebarMain>
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
