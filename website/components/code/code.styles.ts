import styled, { css } from "styled-components";

export const ButtonCss = css`
  border: none;
  color: rgba(255, 255, 255, 0.85);
  padding: 0.75rem 0.75rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  background-color: transparent;
  min-width: 50px;
  justify-content: center;

  :hover {
    background-color: var(--navds-color-gray-80);
  }

  :focus {
    outline: 2px solid white;
    outline-offset: -2px;
  }

  &[aria-selected="true"] {
    box-shadow: inset 0 -2px 0 0 white;
    color: white;
  }
`;

/* Snippet/Block */
export const PreWrapper = styled.div<{ active: boolean }>`
  position: relative;
  background-color: var(--navds-color-darkgray);
  display: ${(props) => (props.active ? "block" : "none")};
  margin-bottom: var(--navds-spacing-8);
`;

export const Pre = styled.pre`
  overflow-x: auto;
  align-items: center;
  display: flex;
  background-color: var(--navds-color-darkgray);
  margin: 0;
  padding: 1rem 1rem 1rem 1rem;
`;

export const Code = styled.code`
  color: white;
  font-size: 1rem;
`;
