import styled from "styled-components";

export const Wrapper = styled.div`
  position: sticky;
  right: 0;
  top: 5rem;
  margin-top: 4rem;
  z-index: 1;
  align-items: start;
  display: flex;
  flex-direction: column;
  order: 1;
  width: 300px;
  height: 100%;
  padding-left: 1rem;

  @media (max-width: 1224px) {
    display: none;
    width: 0;
  }
`;

export const Div = styled.div`
  position: sticky;
  right: 0;
  top: 5rem;
  margin-top: 1rem;
  z-index: 1;
  align-items: start;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  order: 1;

  width: 100%;

  &:before {
    content: "";
    background-color: var(--navds-color-gray-40);
    width: 1px;
    height: calc(100% - 1px);
    margin-top: 0.5rem;
    position: absolute;
    left: -1px;
  }

  @media (max-width: 1224px) {
    display: none;
    width: 0;
  }
`;

export const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Li = styled.li`
  list-style: none;
  margin-top: var(--navds-spacing-4);
  text-align: start;

  a {
    text-decoration: none;
    overflow: hidden;

    text-overflow: ellipsis;
    color: var(--navds-color-darkgray);

    :hover {
      text-decoration: underline;
    }
  }

  &[data-active="true"] {
    a {
      font-weight: bold;
      color: var(--navds-color-gray-90);

      :focus {
        color: white;
      }

      &:before {
        content: "";
        width: 3px;
        height: 2.5rem;
        margin-top: 0;
        margin-left: -1px;
        background-color: var(--navds-color-gray-90);
        position: absolute;
        left: 0;
      }
    }
  }
`;
