import styled from "styled-components";

export const Nav = styled.nav<{ isMobile: boolean }>`
  overflow-x: auto;
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: #f9f9f9;
  ${(props) => {
    return !props.isMobile
      ? `margin-left: 3rem;
         margin-right: auto;
         max-width: 636px;`
      : `margin: 0;
         max-width: none;
         padding-right: 0;
         padding-left: 0;`;
  }};

  ::after {
    content: "";
    background-color: var(--navds-color-gray-20);
    height: 1px;
    width: 100%;
    bottom: 0px;
    left: 0;
    z-index: -1;

    position: absolute;
  }
`;

export const Ul = styled.ul<{ isMobile: boolean }>`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  overflow-x: auto;
  max-width: ${(props) => (props.isMobile ? "" : "700px")};

  > * {
    list-style: none;
    flex: 1 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const A = styled.a`
  border-bottom: 3px solid transparent;
  background: none;
  font-weight: var(--navds-font-weight-bold);
  cursor: pointer;
  text-decoration: none;
  text-transform: capitalize;
  color: var(--navds-color-blue-50);
  flex: 1 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  min-height: 48px;

  &[aria-selected="true"] {
    border-color: var(--navds-color-blue-50);
    color: var(--navds-color-darkgray);
  }

  :hover {
    color: var(--navds-color-darkgray);
    border-color: var(--navds-color-darkgray);
  }

  :focus {
    outline: 3px solid var(--navds-color-blue-80);
    outline-offset: -3px;
  }
`;
