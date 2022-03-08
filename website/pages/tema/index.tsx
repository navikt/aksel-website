import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { PreviewBanner, TemaBreadcrumbs, TemaCard } from "../../components";
import Footer from "../../components/layout/footer/Footer";
import AkselHeader from "../../components/layout/header/AkselHeader";
import { akselTema, AkselTema } from "../../lib";
import { getClient } from "../../lib/sanity/sanity.server";

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
      <TemaBreadcrumbs />
      <Heading
        level="1"
        size="xlarge"
        spacing
        className="index-lvl1 self-start"
      >
        Temaer
      </Heading>

      <div className="aksel-card-grid">
        {page.map((tema) => (
          <TemaCard {...tema} key={tema._id} />
        ))}
      </div>
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <div className="bg-gray-50">
      <AkselHeader className="bg-gray-50" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-main--start w-full max-w-5xl py-16 md:py-20"
      >
        {page}
      </main>
      <Footer />
    </div>
  );
};

interface PageProps {
  page: AkselTema[];
  slug: string;
  preview: boolean;
}

interface StaticProps {
  props: PageProps;
  notFound: boolean;
  revalidate: number;
}

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}): Promise<StaticProps | { notFound: true }> => {
  const page = await getClient(true).fetch(akselTema);

  const doc = page ?? null;

  return {
    props: {
      page: doc,
      slug: "/tema",
      preview,
    },
    notFound: !doc,
    revalidate: 10,
  };
};

export default Page;
