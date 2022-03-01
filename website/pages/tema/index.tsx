import { Right } from "@navikt/ds-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { PreviewBanner } from "../../components";
import Footer from "../../components/layout/footer/Footer";
import AkselHeader from "../../components/layout/header/AkselHeader";
import { akselTema, AkselTema } from "../../lib";
import { getClient } from "../../lib/sanity/sanity.server";

const Page = ({ preview, page }: PageProps): JSX.Element => {
  console.log(page);
  return (
    <>
      {preview && <PreviewBanner />}
      <Head>
        <title>Tema - Aksel</title>
        <meta property="og:title" content="Tema - Aksel" />
      </Head>

      <Heading
        level="1"
        size="xlarge"
        spacing
        className="index-lvl1 self-start pt-8"
      >
        Tema
      </Heading>
      <BodyLong className="mb-32">
        Anim labore laboris et adipisicing consectetur excepteur aliquip minim
        reprehenderit in ipsum enim. Nostrud exercitation enim enim sit laboris
        ea. Adipisicing quis qui et fugiat labore ex.
      </BodyLong>

      <div className="grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 sm:gap-8 lg:justify-start xl:grid-cols-3">
        {page.map((tema) => (
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
            <div className="mt-3">
              Lorem nisi veniam est elit ut excepteur elit nostrud sit.
            </div>
            <Right className=" absolute right-4 bottom-4 -rotate-45" />
          </div>
        ))}
      </div>
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <AkselHeader className="bg-gray-50" />
      <main tabIndex={-1} id="hovedinnhold" className="aksel-main bg-gray-50">
        <div className="aksel-main--start max-w-6xl">{page}</div>
      </main>
      <Footer />
    </>
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
  const page = await getClient(preview).fetch(akselTema);

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
