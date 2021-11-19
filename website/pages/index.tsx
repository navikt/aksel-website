import { Facilitet } from "@navikt/ds-icons";
import { BodyLong, Heading, Ingress, Label } from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import styled from "styled-components";
import { NAVLogoDark } from "../components";

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

const ScOl = styled.ol`
  margin: 0;
  column-gap: 1rem;
  row-gap: 1rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding: 0;
  list-style: none;
`;

const ScCard = styled.a`
  height: 20rem;
  max-width: 18rem;
  text-decoration: none;
  color: var(--navds-semantic-color-text-default);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3rem 2rem 2rem 2rem;
  border-radius: 8px;
  border: 2px solid var(--navds-semantic-color-divider);
  background-color: var(--navds-semantic-color-canvas-background-light);
  position: relative;

  :hover {
    box-shadow: 0 16px 18px -13px rgba(0, 0, 0, 0.1),
      0 17px 36px -14px rgba(0, 0, 0, 0.17);
  }

  :focus {
    border-color: var(--navds-semantic-color-focus);
    outline: none;
  }
`;

const ScBeta = styled(Label)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.25rem 0.5rem;
  background-color: var(--navds-semantic-color-feedback-info-background);
  border-bottom-left-radius: 4px;
  border-top-right-radius: 6px;
`;

const ScIcon = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  flex-shrink: 0;
  background: linear-gradient(
    -52deg,
    rgba(153, 195, 255, 1) 0%,
    rgba(153, 195, 255, 1) 50%,
    rgba(204, 225, 255, 1) 50%,
    rgba(204, 225, 255, 1) 100%
  );

  svg {
    font-size: 1.5rem;
    margin-top: 0.25rem;
    margin-left: 0.25rem;
  }
`;

const ScBodyLong = styled(BodyLong)`
  text-align: center;
`;

const ScFrontpage = styled.div`
  padding: 3rem;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Page = () => {
  return (
    <>
      <Head>
        <title>Verktøykassen</title>
        <meta property="og:title" content="Verktøykassen NAV" />
      </Head>
      <ScFrontpage>
        <ScIntro>
          <ScLogoWrapper>
            <NAVLogoDark />
          </ScLogoWrapper>
          <Heading spacing level="1" size="2xlarge">
            Verktøykassen BETA
          </Heading>
          <Ingress>
            BETA-løsning for nye Designsystem-sider og God praksis
          </Ingress>
        </ScIntro>
        <button
          onClick={() => {
            fetch("/api/slackMsg", {
              method: "POST",
              body: JSON.stringify({
                message: "<@U0116FA1B16> Hello world!",
              }),
            });
          }}
        >
          Send msg til slack
        </button>

        <ScNav aria-label="Portal navigasjon">
          <ScOl>
            <li>
              <NextLink passHref href="/designsystem">
                <ScCard>
                  <ScBeta>BETA</ScBeta>
                  <ScIcon className="card__icon">
                    <Facilitet aria-hidden aria-label="pusslebrikke ikon" />
                  </ScIcon>
                  <Heading spacing level="2" size="medium" as="span">
                    Designsystem V2
                  </Heading>
                  <ScBodyLong>BETA-løsning for ny dokumentasjon</ScBodyLong>
                </ScCard>
              </NextLink>
            </li>
          </ScOl>
        </ScNav>
      </ScFrontpage>
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: { slug: "/", validPath: true, isDraft: false, noLayout: true },
    revalidate: 10,
  };
};

export default Page;
