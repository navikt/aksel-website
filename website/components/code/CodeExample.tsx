import styled from "styled-components";
import RenderExample from "examples";

/* import { v4 as uuid } from "uuid";
import { useMount } from "react-use"; */

const Div = styled.div`
  padding: 3rem;
  border: 2px solid var(--navds-color-gray-20);
`;

const Handle = styled.span`
  position: absolute;
  width: 10px;
  height: 10px;
  color: black;
  background: black;
`;

const CodeExample = ({ component }) => {
  return (
    <>
      <Div>
        <RenderExample component={component} />
      </Div>
    </>
  );
};

export default CodeExample;
