import styled from "styled-components";
import RenderExample from "examples";

/* import { v4 as uuid } from "uuid";
import { useMount } from "react-use"; */

const Div = styled.div`
  padding: 3rem;
  border: 2px solid var(--navds-color-gray-20);
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
