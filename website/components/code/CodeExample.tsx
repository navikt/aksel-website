import { useEffect, useRef } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Div = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 100%;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const CodeExample = ({ frame }) => {
  const idRef = useRef("test");

  return (
    <Div>
      <iframe id={idRef.current} src={frame} frameBorder={0} scrolling="no" />
    </Div>
  );
};

export default CodeExample;
