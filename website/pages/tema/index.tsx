import { PreviewBanner, TemaCard } from "@/components";
import { AkselHeader, Footer } from "@/layout";
import { akselTema } from "@/lib";
import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { AkselTemaT } from "..";
import { getClient } from "../../lib/sanity/sanity.server";

interface PageProps {
  page: AkselTemaT[];
  slug: string;
  preview: boolean;
}

const Page = ({ preview, page }: PageProps): JSX.Element => {
  return (
    <>
      {preview && <PreviewBanner />}
      <Head>
        <title>Temaer - Aksel</title>
        <meta property="og:title" content="Temaer - Aksel" />
        <meta
          name="description"
          content="Oversikt over alle tilgjengelige tema"
        />
      </Head>
      <div className="bg-gray-50">
        <AkselHeader variant="tema" />
        <main tabIndex={-1} id="hovedinnhold" className="focus:outline-none">
          <div className="relative min-h-[80vh] bg-gray-100 px-4 pt-8 pb-24 md:pt-12">
            <div className="mx-auto max-w-aksel xs:w-[90%]">
              <Heading
                level="1"
                size="xlarge"
                spacing
                className="algolia-index-lvl1"
              >
                Alle tema
              </Heading>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {page.map((tema) => (
                  <TemaCard compact {...tema} key={tema._id} />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}) => {
  const page = await getClient(true).fetch(akselTema);

  const doc = page ?? null;

  return {
    props: {
      page: doc,
      slug: "/tema",
      preview,
    },
    notFound: !doc,
    revalidate: 60,
  };
};

export default Page;
