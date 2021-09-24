import styled from "styled-components";
import React from "react";
import { Link } from "@navikt/ds-react";

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
      <Link target="_blank" href={props.url} aria-label="opens preview in web">
        Åpne i egen side
      </Link>
      <StyledDiv>
        <iframe src={props.url} frameBorder={0} />
      </StyledDiv>
    </StyledWrapper>
  );
};
