import { BodyShort, Ingress, Link } from "@navikt/ds-react";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import * as Sc from "../components";
import styled from "styled-components";
import {
  AmplitudeEvents,
  BrandPictogram,
  Card,
  DsPictogram,
  GpPictogram,
  LayoutContext,
  NAVLogoDark,
  SecurityPictogram,
  useAmplitude,
  UuPictogram,
} from "../components";
import { ScBodyShort, ScHeading } from "./designsystem";
import NextLink from "next/link";
import FrontpageFooter from "../components/layout/footer/FrontpageFooter";

import Snowfall from "react-snowfall";

const ScIntro = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 650px;
  text-align: center;
`;

const ScLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;

  > * {
    justify-self: center;
    font-size: 2rem;
  }
`;

const ScNav = styled.nav`
  margin: 4rem auto 0 auto;
`;

const ScDiv = styled.div`
  gap: 1.5rem;
  padding: 0;
  list-style: none;

  grid-template-columns: repeat(4, 18rem);
  place-content: start flex-start;
  display: grid;

  @media (max-width: 1320px) {
    grid-template-columns: repeat(3, 18rem);
  }

  @media (max-width: 1020px) {
    grid-template-columns: repeat(2, 18rem);
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(1, 18rem);
  }
`;

const ScFrontpage = styled.div`
  padding: 3rem;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--navds-semantic-color-component-background-alternate);

  > a {
    color: var(--navds-semantic-color-text);
  }
`;

const ScLink = styled(Link)`
  position: absolute;
  top: 3rem;
  left: 3rem;

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
  }
`;

const ScRelative = styled.div`
  position: relative;
`;

const Page = () => {
  const { logAmplitudeEvent } = useAmplitude();

  const context = useContext(LayoutContext);

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: "/",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Verktøykassen</title>
        <meta property="og:title" content="Verktøykassen NAV" />
      </Head>
      <ScRelative>
        <Snowfall
          color="#dee4fd"
          snowflakeCount={context.isMobile ? 80 : 150}
        />
        <ScFrontpage>
          <NextLink passHref href="https://old-design-nav.vercel.app/">
            <ScLink>Gå til gammel dokumentasjon</ScLink>
          </NextLink>

          <ScIntro>
            <ScLogoWrapper>
              <NAVLogoDark />
            </ScLogoWrapper>
            <ScHeading spacing level="1" size="2xlarge">
              Verktøykassen
              <ScBodyShort>Beta</ScBodyShort>
            </ScHeading>
            <Ingress>
              En samling ressurser fra ulike fagdisipliner som hjelper oss å
              skape bedre, universelt tilgjengelige og sammenhengende produkter
              i NAV.
            </Ingress>
          </ScIntro>
          <ScNav aria-label="Portal navigasjon">
            <ScDiv>
              <Card
                pictogram={<BrandPictogram />}
                heading="Brand"
                content="Brand og visuell profil basert på vår visjon og våre verdier"
                href="https://identitet.nav.no/"
              />
              <Card
                pictogram={<DsPictogram />}
                heading="Designsystem"
                content="Se forhåndsvisninger og kode-eksempler for alle våre komponenter."
                href="/designsystem"
              />
              <Card
                pictogram={<UuPictogram />}
                heading="Universell utforming"
                content="Gjør det enklere å lage produkter i NAV."
                href="https://navikt.github.io/uu/"
              />
              <Card
                pictogram={<GpPictogram />}
                heading="God praksis"
                content="Gjør det enklere å lage produkter i NAV."
                href="https://old-design-nav.vercel.app/god-praksis"
              />
              <Card
                pictogram={<SecurityPictogram />}
                heading="Security Champions Playbook"
                content={
                  <>
                    <BodyShort spacing>
                      Hvordan vi utvikler sikker software i NAV.
                    </BodyShort>
                    <BodyShort>(Krever Github-bruker i navikt org)</BodyShort>
                  </>
                }
                href="https://improved-train-2f244007.pages.github.io/"
              />
            </ScDiv>
          </ScNav>
        </ScFrontpage>
      </ScRelative>
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <Sc.SkipLink href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </Sc.SkipLink>
      <Sc.SidebarMain>
        <Sc.MainFooter>
          <Sc.Main fullwidth tabIndex={-1} id="hovedinnhold">
            {page}
          </Sc.Main>
          <FrontpageFooter />
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
  return {
    props: {
      slug: "/",
      validPath: true,
      isDraft: false,
      preview,
    },
    revalidate: 10,
  };
};

export default Page;
