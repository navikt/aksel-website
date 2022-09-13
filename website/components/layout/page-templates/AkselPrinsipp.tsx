import { SanityT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { BodyShort, Heading, Ingress } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import {
  /* AuthenticationContext,
  AuthenticationStatus, */
  dateStr,
  Feedback,
  TableOfContents,
  UnderArbeid,
} from "../..";
import Footer from "../footer/Footer";
import AkselHeader from "../header/AkselHeader";

const AkselPrinsippTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.aksel_prinsipp;
  title: string;
}): JSX.Element => {
  /* const { status, login } = useContext(AuthenticationContext); */

  if (!data.content || !data.heading) {
    return null;
  }

  const authors = (data?.contributors as any)?.map((x) => x?.title);

  /* const isLoggedIn = status === AuthenticationStatus.IS_AUTHENTICATED; */
  const isLoggedIn = true;

  return (
    <>
      <Head>
        <title>{`${data?.heading} - Prinsipp - ${title}`}</title>
        <meta
          property="og:title"
          content={`${data?.heading} - ${title}`}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={data?.seo?.meta ?? data?.ingress}
          key="ogdesc"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={
            data?.seo?.image
              ? urlFor(data?.seo?.image)
                  .width(1200)
                  .height(630)
                  .fit("crop")
                  .url()
              : ""
          }
          key="ogimage"
        />
      </Head>

      <AkselHeader variant="artikkel" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel bg-gray-50 pt-[8vw] pb-16 focus:outline-none xs:pb-32"
      >
        <div className="px-4">
          <div className="dynamic-wrapper-prose">
            <Heading
              level="1"
              size="xlarge"
              className="algolia-index-lvl1 mt-1"
            >
              {data.heading}
            </Heading>
            {data?.ingress && (
              <Ingress className="mt-4">{data?.ingress}</Ingress>
            )}
            <div className="mt-6 inline-flex flex-wrap gap-2 text-base">
              {authors?.[0] && (
                <>
                  <BodyShort size="small" as="address" className="not-italic">
                    {authors?.[0]}
                  </BodyShort>
                  <BodyShort
                    size="small"
                    className="text-text-muted/40"
                    as="span"
                  >
                    —
                  </BodyShort>
                </>
              )}
              <BodyShort size="small" as="span" className="text-text-muted">
                {dateStr(data?._updatedAt)}
              </BodyShort>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <TableOfContents changedState={data?.content ?? []} hideToc />
          <div className="mt-8 px-4">
            {/* {!isLoggedIn && (
              <div className="mx-auto grid max-w-prose grid-flow-row justify-items-center gap-4 rounded bg-gray-200 py-8 xs:w-[90%]">
                <div className="">
                  <Heading as="p" size="small">
                    Logg inn for å lese artikkelen.
                  </Heading>
                  <BodyShort as="p" size="small" className="mt-1">
                    Bare tilgjengelig for NAV-ansatte.
                  </BodyShort>
                </div>
                <Button onClick={() => login()}>Logg inn</Button>
              </div>
            )} */}
            {data?.under_arbeid?.status ? (
              <>
                <UnderArbeid text={data?.under_arbeid?.forklaring} />
                {data?.under_arbeid?.vis_innhold && (
                  <SanityBlockContent
                    className="dynamic-wrapper-prose"
                    blocks={data?.content ?? []}
                    variant="aksel"
                  />
                )}
              </>
            ) : (
              <SanityBlockContent
                className="dynamic-wrapper-prose"
                blocks={data?.content ?? []}
                variant="aksel"
              />
            )}
          </div>
        </div>
        {isLoggedIn && (
          <div className="mt-16 px-4">
            <div className="dynamic-wrapper-prose border-t border-gray-300 pt-8">
              <Feedback akselFeedback docId={data?._id} docType={data?._type} />
            </div>
          </div>
        )}
      </main>
      <Footer variant="aksel" />
    </>
  );
};

export default AkselPrinsippTemplate;
