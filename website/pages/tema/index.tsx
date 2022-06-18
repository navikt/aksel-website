import { TemaCard } from "@/components";
import { AkselHeader, Footer } from "@/layout";
import { akselTema, usePreviewSubscription } from "@/lib";
import { getClient } from "@/sanity-client";
import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { AkselTemaT } from "..";

interface PageProps {
  page: AkselTemaT[];
  slug: string;
  preview: boolean;
}

const Page = (props: PageProps): JSX.Element => {
  const { data } = usePreviewSubscription(akselTema, {
    initialData: props.page,
    enabled: props?.preview,
  });

  const filteredTemas = data.filter((x) => x.refCount > 0);
  return (
    <>
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
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] bg-gray-100 focus:outline-none"
        >
          <div className="relative bg-white px-4 pt-8 pb-8 md:pt-12">
            <div className="mx-auto w-fit max-w-aksel xs:w-[90%]">
              <Heading
                level="1"
                size="xlarge"
                spacing
                className="algolia-index-lvl1"
              >
                Temaer
              </Heading>
            </div>
          </div>
          <div className="relative px-4 pt-8 pb-24">
            <div className="mx-auto max-w-aksel xs:w-[90%]">
              <div className="mt-4 grid gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {filteredTemas.map((tema) => (
                  <TemaCard compact {...tema} key={tema._id} />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer variant="aksel" />
      </div>
    </>
  );
};

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}) => {
  const page = await getClient().fetch(akselTema);

  return {
    props: {
      page: page,
      slug: "/tema",
      preview,
    },
    notFound: !page,
    revalidate: 60,
  };
};

export default Page;
