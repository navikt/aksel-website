import { Feedback } from "@/components";
import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import Footer from "../footer/Footer";
import AkselHeader from "../header/AkselHeader";

const AkselStandaloneTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.aksel_standalone;
  title: string;
}): JSX.Element => {
  if (!data.innhold || !data.heading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{`${data?.heading} - ${title}`}</title>
        <meta
          property="og:title"
          content={`${data?.heading} - ${title}`}
          key="ogtitle"
        />
      </Head>

      <AkselHeader variant="artikkel" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel bg-gray-50 pt-[8vw] pb-16 focus:outline-none xs:pb-32"
      >
        <div className="px-4">
          <div className="mx-auto max-w-prose xs:w-[90%]">
            <Heading
              level="1"
              size="xlarge"
              className="algolia-index-lvl1 mt-1"
            >
              {data.heading}
            </Heading>
          </div>
        </div>
        <div className="mt-12">
          <div className="mt-8 px-4">
            <SanityBlockContent
              className="mx-auto max-w-prose xs:w-[90%]"
              blocks={data?.innhold ?? []}
              variant="aksel"
            />
          </div>
        </div>
        <div className="mt-16 px-4">
          <div className="mx-auto max-w-prose border-t border-gray-300 pt-8 xs:w-[90%]">
            <Feedback
              akselFeedback
              text="siden"
              docId={data?._id}
              docType={data?._type}
            />
          </div>
        </div>
      </main>
      <Footer variant="aksel" />
    </>
  );
};

export default AkselStandaloneTemplate;