import { useEffect, useRef } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import RenderExample from "examples";

const Div = styled.div`
  padding: 3rem;
  margin-top: 2rem;
  border: 2px solid #282a36;
  border-bottom: none;
`;

const CodeExample = ({ component }) => {
  return (
    <Div>
      <RenderExample component={component} />
    </Div>
  );
};

export default CodeExample;
