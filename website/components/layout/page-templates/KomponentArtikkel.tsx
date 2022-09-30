import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { ExternalLink } from "@navikt/ds-icons";
import { BodyShort, Heading, Tabs, Tag } from "@navikt/ds-react";
import cl from "classnames";
import IntroSeksjon from "components/sanity-modules/IntroSeksjon";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  capitalize,
  dateStr,
  Feedback,
  logNav,
  TableOfContents,
  UnderArbeid,
} from "../..";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const kodepakker = {
  "ds-react": {
    title: "@navikt/ds-react",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
  "ds-css": {
    title: "@navikt/ds-css",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
  "ds-react-internal": {
    title: "@navikt/ds-react-internal",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/internal",
  },
  "ds-css-internal": {
    title: "@navikt/ds-css-internal",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/internal",
  },
  "ds-icons": {
    title: "@navikt/ds-reaciconst",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
  "ds-tokens": {
    title: "@navikt/ds-tokens",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
  "ds-tailwind": {
    title: "@navikt/ds-tailwind",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
};

const KomponentArtikkelTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.komponent_artikkel;
  title: string;
}): JSX.Element => {
  const { query, push } = useRouter();

  const tabs = {
    bruk: "bruk_tab",
    kode: "kode_tab",
  };

  const basePath = `/designsystem/komponenter/${query.slug[1]}`;
  const activeTab = Object.keys(tabs).indexOf(query.slug?.[2] ?? "bruk");
  const tabKey = Object.keys(tabs)?.[activeTab];

  return (
    <>
      <Head>
        <title>
          {data?.heading ? `${data?.heading} ${tabKey} - ${title}` : title}
        </title>
        <meta
          property="og:title"
          content={`${data.heading} - Designsystemet`}
        />
      </Head>

      <div className="content-box">
        <div className="py-8">
          <div className="flex flex-wrap gap-2"></div>
          <Heading
            size="xlarge"
            level="1"
            spacing
            className="algolia-index-lvl1 flex flex-wrap items-center gap-4"
          >
            {data.heading}
            <div className="flex flex-wrap items-center gap-2">
              {data?.kodepakker?.map((x) => (
                <Tag
                  variant="info"
                  size="small"
                  className="border-transparent bg-gray-100 font-mono"
                  key={x}
                >
                  {kodepakker?.[x]?.title}
                </Tag>
              ))}
            </div>
            {/* {npmPackage?.title && (
              <Tag
                variant="info"
                size="small"
                className="border-transparent bg-gray-100 font-mono"
              >
                {npmPackage.title}
              </Tag>
            )} */}
          </Heading>
          <BodyShort
            as="div"
            size="small"
            className="mb-4 flex flex-wrap items-center justify-start gap-x-4 gap-y-3"
          >
            {data?.status && data.status?.tag !== "ready" && (
              <Tag
                variant="info"
                size="small"
                className={cl("border-none capitalize", {
                  "bg-gray-200 capitalize text-text":
                    data.status?.tag === "deprecated",
                  "bg-green-300 capitalize text-text":
                    data.status?.tag === "new",
                  "bg-purple-400 text-text-inverted":
                    data.status?.tag === "beta",
                })}
              >
                {data.status?.tag}
              </Tag>
            )}
            <BodyShort
              size="small"
              as="span"
              className="flex items-center text-text-muted"
            >
              {`Oppdatert ${dateStr(data._updatedAt)}`}
            </BodyShort>
          </BodyShort>
          <BodyShort
            as="span"
            size="small"
            className="flex gap-4 text-text-muted"
          >
            {/* {npmPackage?.title && (
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`https://yarnpkg.com/package/${npmPackage.title}`}
                className="flex items-center gap-1 underline hover:text-text hover:no-underline focus:bg-blue-800 focus:text-text-inverted focus:no-underline focus:shadow-focus focus:outline-none"
              >
                Yarn
                <ExternalLink title="Gå til yarn pakke" />
              </a>
            )}
            {npmPackage?.github_link && (
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={npmPackage.github_link}
                className="flex items-center gap-1 underline hover:text-text hover:no-underline focus:bg-blue-800 focus:text-text-inverted focus:no-underline focus:shadow-focus focus:outline-none"
              >
                Kode
                <ExternalLink title="Gå til github-kode" />
              </a>
            )} */}
            {data.figma_link && (
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={data.figma_link}
                className="flex items-center gap-1 underline hover:text-text hover:no-underline focus:bg-blue-800 focus:text-text-inverted focus:no-underline focus:shadow-focus focus:outline-none"
              >
                Figma
                <ExternalLink title="Åpne i Figma" />
              </a>
            )}
          </BodyShort>
        </div>
      </div>
      <Tabs
        className="top-0 z-[1001]"
        value={tabKey}
        onChange={(x) => {
          const url = x === "bruk" ? basePath : `${basePath}/${x}`;
          push(url, undefined, { shallow: true });
          logNav("tabs", window.location.pathname, url);
        }}
      >
        <Tabs.List className="mx-0 px-2 md:mx-12 md:px-0">
          {Object.entries(tabs)
            .filter(([, val]) => !!data[val])
            .map(([key]) => (
              <Tabs.Tab
                as="button"
                key={key}
                value={key}
                label={capitalize(key)}
              />
            ))}
        </Tabs.List>
        {Object.entries(tabs)
          .filter(([, val]) => !!data[val])
          .map(([key, val]) => (
            <Tabs.Panel
              className="tabpanel relative max-w-full md:max-w-7xl"
              key={key + val}
              value={key}
            >
              <TableOfContents changedState={data[val]} hideToc={false} />
              <div className="content-box">
                {data?.under_arbeid?.status ? (
                  <>
                    <UnderArbeid
                      className="mt-12"
                      text={data?.under_arbeid?.forklaring}
                    />
                    {data?.under_arbeid?.vis_innhold && (
                      <div>
                        {val === "bruk_tab" && data.intro && (
                          <IntroSeksjon node={data.intro} />
                        )}
                        {data[val] && <SanityBlockContent blocks={data[val]} />}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="mt-12">
                    {val === "bruk_tab" && data.intro && (
                      <IntroSeksjon node={data.intro} />
                    )}
                    {data[val] && <SanityBlockContent blocks={data[val]} />}
                  </div>
                )}
                <Feedback docId={data?._id} docType={data?._type} />
              </div>
            </Tabs.Panel>
          ))}
      </Tabs>
      <style jsx global>{`
        .tabpanel[data-state="active"] {
          display: flex;
        }
      `}</style>
    </>
  );
};

export default KomponentArtikkelTemplate;
