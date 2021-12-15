import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";
import { DsFrontpageIllustration } from "../../components/assets/DsFrontpageIllustration";
import {
  ComponentPictogram,
  IconsPictogram,
} from "../../components/assets/pictograms";
import DesignsystemFooter from "../../components/layout/footer/DesignsystemFooter";
import DesignsystemHeader from "../../components/layout/header/DesignsystemHeader";
import { dsNavigationQuery, getClient } from "../../lib";
import * as Sc from "../../components";
import { useAmplitude, AmplitudeEvents } from "../../components";

const ScCard = styled.a`
  height: 22rem;
  max-width: 18rem;
  text-decoration: none;
  color: var(--navds-semantic-color-text);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 3rem 2rem 2rem 2rem;
  border-radius: 4px;
  background-color: var(--navds-semantic-color-canvas-background-light);
  position: relative;
  box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
    0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14);

  :hover {
    box-shadow: none;
    background-color: var(--navds-semantic-color-canvas-background);
  }

  :focus {
    border-color: var(--navds-semantic-color-focus);
    outline: none;
    box-shadow: 0 0 0 3px var(--navds-semantic-color-focus);
  }

  h2 {
    text-decoration: underline;
  }
`;

const ScIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 1.5rem;
  flex-shrink: 0;

  svg {
    font-size: 3rem;
    margin-top: 0.25rem;
    margin-left: 0.25rem;
  }
`;

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

const ScDescriptionWrapper = styled.div`
  padding: 2.5rem 3rem;

  @media (max-width: 564px) {
    padding: 3rem 1rem;
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

const ScHeading = styled(Heading)`
  position: relative;
  width: fit-content;
`;

const ScBodyShort = styled(BodyShort)`
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(120%);
`;

const Page = () => {
  const { logAmplitudeEvent } = useAmplitude();

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: "/designsystem",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Designsystemet</title>
        <meta property="og:title" content="Designsystemet NAV" />
      </Head>
      <>
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
        <ScFlex>
          <ScDescriptionWrapper>
            <Heading spacing level="2" size="small">
              Hva er nytt?
            </Heading>
            <BodyLong>
              Vi ruller for tiden ut ny beta-versjon av designsystemet, og alt
              innhold er ikke på plass enda.🔧
            </BodyLong>
            <BodyLong>
              <NextLink passHref href="https://old-design-nav.vercel.app/">
                <Link>Gå til den gamle versjonen</Link>
              </NextLink>
            </BodyLong>
          </ScDescriptionWrapper>
          <ScCards>
            <NextLink passHref href="/designsystem/side/komponenter">
              <ScCard>
                <ScIcon className="card__icon">
                  <ComponentPictogram />
                </ScIcon>
                <Heading spacing level="2" size="medium">
                  Komponenter
                </Heading>
                <BodyLong>
                  Se forhåndsvisninger og kode-eksempler for komponenter.
                </BodyLong>
              </ScCard>
            </NextLink>
            <NextLink passHref href="/designsystem/side/ikoner/ikons%C3%B8k">
              <ScCard>
                <ScIcon className="card__icon">
                  <IconsPictogram />
                </ScIcon>
                <Heading spacing level="2" size="medium">
                  Ikoner
                </Heading>
                <BodyLong>Søk og ta i bruk alle NAVs egne ikoner.</BodyLong>
              </ScCard>
            </NextLink>
          </ScCards>
        </ScFlex>
      </>
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
          <Sc.Main fullwidth tabIndex={-1} id="hovedinnhold">
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
  const navigation = await getClient(false).fetch(dsNavigationQuery);

  return {
    props: {
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
