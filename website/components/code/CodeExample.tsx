import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import RenderExample from "examples";

import { v4 as uuid } from "uuid";
import { useMount } from "react-use";

const Div = styled.div`
  padding: 3rem;
  margin-top: 2rem;
  border: 2px solid #282a36;
  border-bottom: none;
`;

const Handle = styled.span`
  position: absolute;
  width: 10px;
  height: 10px;
  color: black;
  background: black;
`;

const CodeExample = ({ component }) => {
  const [width, setWidth] = useState(200);
  const divId = useRef(component);

  useMount(() =>
    setWidth(document.getElementById(divId.current).offsetWidth - 6 * 16)
  );

  return (
    <>
      <Div id={component}>
        <RenderExample component={component} />
      </Div>
    </>
  );
};

export default CodeExample;
