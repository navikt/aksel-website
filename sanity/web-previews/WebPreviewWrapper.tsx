import styled from "styled-components";
import React from "react";
import { Link, BodyLong } from "@navikt/ds-react";

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
  align-items: center;
`;

export const WebPreviewWrapper = (props: { url: string }) => {
  return (
    <StyledWrapper>
      <BodyLong>
        Preview prøver å vise innhold på den publiserte nettsiden. Dette er en
        litt skjør prosess som lett brekker, så kan forvente litt bugs og rare
        feil. Sjekk om du har noen feil i sanity først hvis preview brekker.
        Hvis disse feilene dukker opp for publisert versjon, ta kontakt med
        utvikler.
      </BodyLong>
      <Link target="_blank" href={props.url} aria-label="opens preview in web">
        Åpne i egen side
      </Link>
      <StyledDiv>
        <iframe src={props.url} frameBorder={0} />
      </StyledDiv>
    </StyledWrapper>
  );
};
