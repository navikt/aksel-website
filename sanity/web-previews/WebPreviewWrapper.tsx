import styled from "styled-components";
import React from "react";
import { Link, HelpText } from "@navikt/ds-react";
import { CopyToClipboard } from "@navikt/ds-react-internal";

const StyledDiv = styled.div`
  iframe {
    height: 100%;
    width: 100%;
  }
  height: 100%;
  margin: 0.5rem;
  box-shadow: 0 0 1rem #888;
  width: 100%;
`;

const StyledWrapper = styled.div`
  margin: 0.5rem;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
  gap: 0.5rem;
`;

const ScTop = styled.div`
  margin: 0.5rem;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const WebPreviewWrapper = (props: { url: string }) => {
  return (
    <StyledWrapper>
      <ScTop>
        <HelpText title="Hva er preview?">
          Preview prøver å vise innhold på den publiserte nettsiden. Dette er en
          litt skjør prosess som lett brekker, så kan forvente litt bugs og rare
          feil. Sjekk om du har noen feil i sanity først hvis preview brekker.
          Hvis disse feilene dukker opp for publisert versjon, ta kontakt med
          utvikler.
        </HelpText>
        <CopyToClipboard
          size="small"
          popoverText={"Kopierte lenke"}
          copyText={props.url}
        >
          Kopier lenke for deling
        </CopyToClipboard>
        <Link
          target="_blank"
          href={props.url}
          aria-label="opens preview in web"
        >
          Åpne i egen side
        </Link>
      </ScTop>
      <StyledDiv>
        <iframe src={props.url} frameBorder={0} />
      </StyledDiv>
    </StyledWrapper>
  );
};
