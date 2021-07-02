import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 256px;

  /*   position: relative; */
  flex-shrink: 0;
  background-color: white;
  border-right: 1px solid var(--navds-color-gray-20);
  /* display: flex; */

  @media (max-width: 1068px) {
    display: none;
  }
`;

function Sidebar() {
  return (
    <Wrapper>
      <ul>
        <li>Placeholder</li>
        <li>Placeholder</li>
        <li>Placeholder</li>
        <li>Placeholder</li>
        <li>Placeholder</li>
        <li>Placeholder</li>
      </ul>
    </Wrapper>
  );
}

export default Sidebar;
