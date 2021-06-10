import styled from "styled-components";
import React from "react";

const StyledDiv = styled.div`
  iframe {
    height: 100%;
    width: 100%;
  }
  height: 100%;
  margin: 1rem;
  box-shadow: 0 0 1rem #888;
`;

export const WebPreviewWrapper = (props: { url: string }) => {
  return (
    <StyledDiv>
      <a target="_blank" href={props.url} aria-label="opens preview in web">
        Open in web..
      </a>
      <iframe src={props.url} frameBorder={0} />
    </StyledDiv>
  );
};
