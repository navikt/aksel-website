import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import Head from "next/head";
import React, { useEffect } from "react";
import styled from "styled-components";
import * as Sc from "../../components";
import { AmplitudeEvents, Card, useAmplitude } from "../../components";
import {
  DsFrontpageFooterIllustration,
  DsFrontpageIllustration,
} from "../../components/assets/DsFrontpageIllustration";
import DesignsystemFooter from "../../components/layout/footer/DesignsystemFooter";
import DesignsystemHeader from "../../components/layout/header/DesignsystemHeader";
import { SanityBlockContent } from "../../components/SanityBlockContent";
import {
  DsFrontPageCardT,
  dsFrontpageQuery,
  dsNavigationQuery,
  getClient,
} from "../../lib";
import { DsFrontpage, DsNavigation } from "../../lib/autogen-types";

const ScFlex = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 1440px;
  background-color: var(--navds-semantic-color-component-background-alternate);
`;

const ScFlexReverse = styled.div`
  position: relative;
  display: flex;
  max-width: 1440px;
`;

const ScTopBg = styled.div`
  background-color: var(--navds-semantic-color-canvas-background-light);
  widht: 100%;
`;

const ScTitle = styled.div`
  padding: 4rem 3rem;

  @media (max-width: 564px) {
    padding: 3rem 1rem;
  }

  background-color: var(--navds-semantic-color-canvas-background-light);
  height: 240px;
  width: 100%;
  flex: 1 1 500px;
`;

const ScIllustration = styled.div`
  height: 240px;

  @media (max-width: 1064px) {
    display: none;
  }
`;

const ScFooterIllustration = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

  @media (min-width: 769px) {
    display: none;
  }
`;

const ScDescriptionWrapper = styled.div`
  padding: 2.5rem 3rem;

  @media (max-width: 564px) {
    padding: 3rem 1rem;
  }

  > * > *.navds-typo--spacing {
    margin-bottom: var(--navds-spacing-2);
  }
`;

const ScCards = styled.div`
  padding: 0 3rem 4rem 3rem;

  @media (max-width: 564px) {
    padding: 0 1rem 3rem 1rem;
  }

  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export const ScHeading = styled(Heading)`
  position: relative;
  width: fit-content;

  .santahat {
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;

    transform: translateX(-45%) translateY(-28%) rotateZ(-10deg) scale(0.7);
  }
`;

export const ScBodyShort = styled(BodyShort)`
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(120%);

  @media (max-width: 564px) {
    transform: translateX(100%);
  }
`;

const ScBg = styled.div`
  background-color: var(--navds-semantic-color-component-background-alternate);
`;

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

  /* console.log(pageProps); */

  return (
    <>
      <Head>
        <title>Designsystemet</title>
        <meta property="og:title" content="Designsystemet NAV" />
      </Head>
      {props.preview && <Sc.PreviewBanner />}
      <ScBg>
        <ScTopBg>
          <ScFlexReverse>
            <ScTitle>
              <ScHeading spacing level="1" size="2xlarge">
                Designsystemet
                <ScBodyShort>Beta</ScBodyShort>
              </ScHeading>
              <BodyLong>Gjør det enkelt å lage produkter i NAV</BodyLong>
            </ScTitle>
            <ScIllustration>
              <DsFrontpageIllustration />
            </ScIllustration>
          </ScFlexReverse>
        </ScTopBg>
        <ScFlex>
          <ScDescriptionWrapper>
            {props?.page?.body && (
              <SanityBlockContent blocks={props?.page?.body} />
            )}
          </ScDescriptionWrapper>
          <ScCards>
            {props?.page?.cards &&
              props?.page?.cards.map((card: DsFrontPageCardT) => {
                return <Card key={card._key} node={card} tag={true} />;
              })}
          </ScCards>
        </ScFlex>
        <ScFooterIllustration>
          <DsFrontpageFooterIllustration />
        </ScFooterIllustration>
      </ScBg>
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <Sc.SkipLink href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </Sc.SkipLink>
      <DesignsystemHeader />
      <Sc.SidebarMain>
        <Sc.MainFooter>
          <Sc.Main fullwidth tabIndex={-1} id="hovedinnhold" graybg>
            {page}
          </Sc.Main>
          <DesignsystemFooter />
        </Sc.MainFooter>
      </Sc.SidebarMain>
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
